require('dotenv').config();
const LocalStrategy = require('passport-local').Strategy;
const User = require('./database/controllers/usersController');
const bcrypt = require('bcrypt-nodejs');

const db = require('./database/dbConfig');
const texter = require('./apis/textController');

module.exports = function(app, passport) {
  // ---SERIALIZE USER---
  passport.serializeUser(function(user, done) {
    console.log('serializing: ');
    console.log(user);
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log('deserialized this id: ' + id);
    User.findById(id).then(function(user) {
      console.log('deserialized thisss: ' + user);
      done(null, user);
    });
  });

  //----SIGN-UP ROUTE----
  passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      function(req, email, password, done) {
        User.findByEmail(email).then(function(user) {
          console.log('Local signup strategy working');
          if(user.length) {
            console.log('user exists, it is ' + user[0].first_name);
            return done(null, false, { message: 'Incorrect username.' });
          } else {
            let hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            let verified;
            texter.verifyNumber(`${req.body.firstName} ${req.body.lastName}`,req.body.phone,function(result) {
              verified = result;
            })
            User.addUser(email,hashedPassword,req.body.firstName,req.body.lastName,req.body.phone,req.body.voicePref,req.body.avatar);

            User.findByEmail(email).then(function(user) {
              const newUser = user[0];
              console.log('user added!');
              console.log(user[0]);
              return done(null, newUser);
            });
          }
        });
      }));

      // ----LOGIN ROUTE----
      passport.use('local-login', new LocalStrategy({
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback: true
        },
        function(req, email, password, done) {
          console.log('Local login strategy working');
          User.findByEmail(email).then(function(user) {
            const matched = bcrypt.compareSync(password, user[0].password);
            console.log('matched is: ' + matched);
            if(user.length === 0) {
              console.log('email not found');
              return done(null, false, { message: 'Email already taken'});
            } else if(matched === false){
              console.log('wrong password');
              return done(null, false, { message: 'Password incorrect'});
            }
            console.log('password correct');
            return done(null, user[0]);
          })
        }));

  };
