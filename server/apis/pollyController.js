// controller for Amazon Polly API
// 1. Load SDK, set config variables, then create a Polly Instance;
require('dotenv').config();
const AWS = require('aws-sdk')
AWS.config.accessKeyId = process.env.AWS_AKID
AWS.config.secretAccessKey = process.env.AWS_SAK
AWS.config.region = process.env.AWS_REGION
const polly = new AWS.Polly();
const s3 = new AWS.S3();
// FOR DEBUGGING ***********************
const log = console.log; //*************
// 2. helper function to chop up text data for Polly into manageable segments of text
  // (i.e., within Polly input-length limits)
  // e.g. Input: 'long chunks of text' => Output: [['long'], ['chunks'], ['of'], ['text']]
const chopUpText = (text, charSeparator = '\n', maxLength = 1000) => {
  log('INSIDE chopUpText') //*************
  return text.split(charSeparator).reduce((memo, p) => {
    if(memo[memo.length - 1].length < maxLength) {
      memo[memo.length - 1] += charSeparator + p
      return memo
    }
    else {
      memo[memo.length] = p
      return memo
    }
  }, [[]])
}
// 3. Function that generates Audio Stream by making API call to Polly; => returns a promise object
const generatePollyAudio = (text, voiceId) => {
  log ('INSIDE generatePollyAudio') //*************
  const params = {
    Text: text,
    TextType: 'text',
    OutputFormat: 'mp3',
    VoiceId: voiceId,
    SampleRate: '22050'
  }
  Promise.resolve(polly.synthesizeSpeech(params))
  .then( data => {
    log ('INSIDE generatePollyAudio-PC') //*************
    if (data.AudioStream instanceof Buffer) return data
  })
  .catch(err => {
    console.error('AudioStream is not a Buffer.')
  })
  // .catch( err => throw 'AudioStream is not a Buffer.')
};
// 4. helper function to upload to S3 => it returns a promise object
const putObject = (bucket, key, body, ContentType) =>
  log('INSIDE putObject: bucket, key, body, ContentType: ', bucket, key, body, ContentType) //*************
  // Promise.resolve(
  //   s3.putObject({
  //     Bucket: bucket,
  //     Key: key,
  //     Body: body,
  //     ContentType
  //   }))
// 5. Function that Uploads Polly mp3 audio to Amazon S3, generating a url to serve to client
const writeAudioStreamToS3 = ( audioStream, filename ) =>
  log('INSIDE writeAudioStreamToS3 filename: ', filename) //*************
  const bucketName = 'readcastly-user-files'

  // SEE #4 (ABOVE)
  putObject(bucketName, filename, audioStream,'audio/mp3')
  .then( res => {
    log('INSIDE putObject') //*************
    if(!res.ETag) throw res
    else return {
      msg: 'File successfully generated.',
      ETag: res.ETag,
      // url: `https://s3.amazonaws.com/${bucketName}/${filename}`
      url: `https://s3.amazonaws.com/${bucketName}/${filename}.mp3`
    }
  })
// 6. contains main logic of pollyController
// const textToSpeech = async (req, res) => {
const textToSpeech = (req, res) => {
  log('INSIDE textToSpeech') //*************

  // Extract needed info from request object
  const voiceId = req.body.voice || 'Joanna' /*name of voice*/
  const text = req.body.article.text || '' /*text of the article*/
  const filename = req.body.article_id || '999999999' /*unique article_id number*/
  // also available: req.body.destination => /*e-mail address if e-mail, phone number if phone, 'stream' if stream, 'link' if link */
  log('FILENAME: ', filename)
  // SEE #2 (ABOVE): Break in parts small enough to be handled by Polly API
  const textParts = chopUpText(text)

  log('INSIDE textToSpeech: voiceId: ', voiceId, ' text: ', text, ' filename: ', filename) //*************
  // SEE #3 (ABOVE): feed segments of text into polly to generate audio segments
  // textParts.map((onePart) => await generatePollyAudio(onePart, voiceId))
  textParts.map((onePart) => generatePollyAudio(onePart, voiceId)) //
  .then(function(audios) {
    log('textToSpeech pc1')
    return audios.map(a => a.AudioStream)
  })
  // Concatenate audio segments into single buffer object
  .then(function(audioStreams) {
    log('textToSpeech pc2')
    return Buffer.concat(audioStreams, audioStreams.reduce((len, a) => len + a.length, 0))
  })
  // SEE #5 (ABOVE): save unifiedBuffer to s3 as mp3 file
  .then(function(unifiedBuffer) {
    log('textToSpeech pc3')
    return writeAudioStreamToS3(unifiedBuffer.AudioStream, filename)
  })
  // Return URL of audio to front-end
  .then(function(response) {
    log('textToSpeech pc4')
    res.send({url: response.url})
  })
  .catch(function(err) {
    log('textToSpeech pc5-ERR')
    if(err.errorCode && err.error) res.status(err.errorCode).send(err.error)
    else res.status(500).send(err)
  });
}
// export default textToSpeech;
module.exports = textToSpeech;