require('dotenv').config();
const twilio = require('twilio');
const polly = require('./pollyController');

const client = new twilio.RestClient(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const textIt = function(phone,title,url,callback) {
  client.messages.create({
      body: 'ReadCast.ly presents "' + title + '": ' + url,
      to: phone,
      from: process.env.TWILIO_NUMBER,
    }, function(err, message) {
         if(err) {
           console.error('TWILIO ERROR ', err.message);
         } else {
          // console.log('TEXT SENT MSG', message);
          callback(message.to);
         }
    });
};

const sendText = function(req,res,callback) {
    polly.textToSpeech(req,res,function(url) {
        textIt(req.body.payload.destination,req.body.payload.article.title,url,callback);
    });
};

const verifyNumber = function(name, number,callback) {
  client.outgoingCallerIds.create({
    friendlyName: name,
    phoneNumber: number
  }, function(err, callerId) {
    if (err) {
      console.log('ERROR', err);
      callback(false);
    } else {
      console.log('Number verified');
      console.log(callerId);
      callback(true);
    }
  });
}

module.exports = { sendText, verifyNumber };

// const deleteMedia = function(message, callback) {
//   client.messages(message.parent_sid).media(message.sid).delete(function(err, data) {
//     if (err) {
//         console.log('ERROR DELETING MEDIA AFTER SENDING', error);
//         throw err.message;
//     } else {
//         console.log("Media deleted successfully.");
//         callback(data);
//     }
//   });
// };

// const getMedia = function(message,callback) {
//   client.messages(message.sid).media.list(function(err, data) {
//     console.log(data);
//     data.mediaList.forEach(function(media) {
//         console.log(media.contentType);
//     });
// });
// }