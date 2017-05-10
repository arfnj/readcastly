import React from 'react';
import { Grid, Row, Col, Jumbotron, FormGroup, ControlLabel, InputGroup, FormControl, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { hashHistory } from 'react-router';

let errors={
              email: 'Please enter a valid e-mail address',
              duplicate: 'An account with that e-mail address already exists',
              password: 'Please make sure your passwords match',
              phone: 'Please enter a valid 10-digit phone number'
            };

const validnums = {'0':true, '1':true, '2':true, '3':true, '4': true, '5':true, '6':true, '7':true, '8':true, '9':true};

class SignupForm extends React.Component {
  constructor() {
		super();

    this.state = {
      firstName: '',
      email: '',
      password: '',
      password2: '',
      lastName: '',
      phone: '',
      voicePref: '',
      avatar: '',
      error: '',
      errormsg: '',
      alert: false
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePassword2Change = this.handlePassword2Change.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleVoicePrefChange = this.handleVoicePrefChange.bind(this);
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp(e) {
    e.preventDefault();
    // console.log("The email is: " + this.state.email);
    // console.log("The password is: " + this.state.password);
    // console.log("The first name is: " + this.state.firstName);
    // console.log("The last name is: " + this.state.lastName);
    // console.log("The phone is: " + this.state.phone);
    // console.log("The voice pref is: " + this.state.voicePref);
    // console.log("The avatar is: " + this.state.avatar);
    axios.post('/api/signup', {
      email: this.state.email.toLowerCase(),
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      voicePref: this.state.voicePref,
      avatar: this.state.avatar,
    })
		.then((res) => {
			console.log("POST REQUESTTTTTTTTTTTTTTTTTTTTTT" + res);
      hashHistory.push('/app');
      return;
		});
  }

  stage2(e) {
    if (this.passwordChecker() === false) {
      this.setState({alert: true});
      return;
    }
    if (this.phoneChecker() === false) {
      this.setState({alert: true});
      return;
    }
    this.handleSignUp(e);
  }

  emailChecker() {
    const emarray = this.state.email.split('');
    const len = emarray.length
    const ats = emarray.filter(char => char==='@').length;
    if (ats !== 1 || (emarray[len-3] !== '.' && emarray[len-4] !== '.')) {
      this.setState({error: 'email', errormsg: errors.email});
      return false;
    }
    return;
  }

  verify(e) {
    if (this.emailChecker() === false) {
      this.setState({alert: true});
      return;
    } else {
      axios.post('/emailCheck', {email: this.state.email.toLowerCase()})
        .then((res) => {
          console.log('email checking res.data', res.data )
          if (res.data.found) {
            this.setState({error: 'duplicate', errormsg: errors.duplicate}, function() {
              this.setState({alert: true});
            });
          } else {
          this.stage2(e);
          }
        })
        .catch((err) => console.log('error checking existing email == ', err))
    }
  }

  passwordChecker() {
    if (this.state.password !== this.state.password2) {
      this.setState({error: 'password', errormsg: errors.password});
      return false;
    }
    return;
  }

  phoneChecker() {
    if (this.state.phone === '') {
      return;
    }
    let cleanPhone = this.state.phone.split('').filter(char => validnums[char]);
    if (cleanPhone.length !== 10 || cleanPhone[0] === '0' || cleanPhone[0] === '1') {
      this.setState({error: 'phone', errormsg: errors.phone});
      return false;
    }
    this.setState({phone: '+1' + cleanPhone.join('')});
    return;
  }

  handleFirstNameChange(e) {
    console.log(e.target.value)
    this.setState({ firstName: e.target.value });
  }

  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handlePassword2Change(e) {
    this.setState({ password2: e.target.value });
  }

  handlePhoneChange(e) {
    this.setState({ phone: e.target.value });
  }

  handleVoicePrefChange(e) {
    this.setState({ voicePref: e.target.value });
  }

  handleAvatarChange(e) {
    this.setState({ avatar: e.target.value });
  }

  close() {
    this.setState({alert: false});
    if (this.state.error === 'email' || this.state.error === 'duplicate') {this.setState({email: ''})}
    if (this.state.error === 'password') {this.setState({password: '', password2: ''})}
    if (this.state.error === 'phone') {this.setState({phone: ''})}
  }

  render() {
    return (
      <div id="signup-page" className="modal-container">
      <Grid>
        <Row>
          <Col md={6} mdOffset={3}>
            <Jumbotron id="signup-jumbo">
              <img id="signup-logo" src='../images/readcastly-full-50pct.png' className="center-block" />
              <form>
                <FormGroup bsSize="lg" onSubmit={this.verify.bind(this)} >
                  <ControlLabel className="signup-label">E-mail Address</ControlLabel>
                  <InputGroup>
                    <InputGroup.Addon style={{backgroundColor: '#70cbce'}}><span className="glyphicon glyphicon-envelope" aria-hidden="true"></span></InputGroup.Addon>
                    <FormControl type="text" placeholder="Required" value={this.state.email} onChange={this.handleEmailChange} required />
                  </InputGroup>
                  <ControlLabel className="signup-label">First Name</ControlLabel>
                  <InputGroup>
                    <InputGroup.Addon style={{backgroundColor: '#70cbce'}}><span className="glyphicon glyphicon-user" aria-hidden="true"></span></InputGroup.Addon>
                    <FormControl type="text" placeholder="Required" value={this.state.firstName} onChange={this.handleFirstNameChange} required />
                  </InputGroup>
                  <ControlLabel className="signup-label">Last Name</ControlLabel>
                  <InputGroup>
                    <InputGroup.Addon style={{backgroundColor: '#70cbce'}}><span className="glyphicon glyphicon-user" aria-hidden="true"></span></InputGroup.Addon>
                    <FormControl type="text" placeholder="Optional" value={this.state.lastName} onChange={this.handleLastNameChange}/>
                  </InputGroup>
                  <ControlLabel className="signup-label">Password</ControlLabel>
                  <InputGroup>
                    <InputGroup.Addon style={{backgroundColor: '#70cbce'}}><span className="glyphicon glyphicon-lock" aria-hidden="true"></span></InputGroup.Addon>
                    <FormControl type="password" placeholder="Required" value={this.state.password} onChange={this.handlePasswordChange} required />
                  </InputGroup>
                  <ControlLabel className="signup-label">Verify Password</ControlLabel>
                  <InputGroup>
                    <InputGroup.Addon style={{backgroundColor: '#70cbce'}}><span className="glyphicon glyphicon-lock" aria-hidden="true"></span></InputGroup.Addon>
                    <FormControl type="password" placeholder="Required" value={this.state.password2} onChange={this.handlePassword2Change} required />
                  </InputGroup>
                  <ControlLabel  className="signup-label">Phone (To receive ReadCasts via text)</ControlLabel>
                  <InputGroup>
                    <InputGroup.Addon style={{backgroundColor: '#70cbce'}}><span className="glyphicon glyphicon-phone-alt" aria-hidden="true"></span></InputGroup.Addon>
                    <FormControl type="text" placeholder="Optional (10 digits required)" value={this.state.phone} onChange={this.handlePhoneChange} />
                  </InputGroup>
                  <br />
                  <Button bsStyle="warning" type="submit" onClick={this.verify.bind(this)} block>Join Us!</Button>
                </FormGroup>
              </form>
            <div>Already have an account? <a href="/#/">Login here</a></div>
          </Jumbotron>
        </Col>
      </Row>
      </Grid>
      <div style={{height: 200}}>
        <Modal
          show={this.state.alert}
          onHide={this.close.bind(this)}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title">Sorry ...</Modal.Title>
          </Modal.Header>
            <Modal.Body>{this.state.errormsg}</Modal.Body>
          <Modal.Footer>
            <Button bsStyle="warning" onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
    );
  }
}

export default SignupForm;

{/*}
              <form onSubmit={this.handleSignUp}>
                First Name:<br/>
              <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleFirstNameChange}/><br/>
                Last Name:<br/>
              <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleLastNameChange}/><br/>
                E-mail:<br/>
              <input type="email" name="email" value={this.state.email} onChange={this.handleEmailChange}/><br/>
                Password:<br/>
              <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange}/><br/>
                Phone Number:<br/>
              <input type="text" name="phone" value={this.state.phone} onChange={this.handlePhoneChange}/>{/*<br/>
                Voice Preference:<br/>
              <input type="text" name="voicePref" value={this.state.voicePref} onChange={this.handleVoicePrefChange}/><br/>
                Avatar:<br/>
              <input type="url" name="avatar" value={this.state.avatar} onChange={this.handleAvatarChange}/>*/}{/*<br/>
              <Button type="submit" bsStyle="success">Sign Up</Button>
              </form>
*/}
