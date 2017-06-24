var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/users.js');
var configAuth = require('./auth');

module.exports = function(passport) {  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  //Facebook
  passport.use(new FacebookStrategy({  
    clientID: configAuth.facebook.clientID,
    clientSecret: configAuth.facebook.clientSecret,
    callbackURL: configAuth.facebook.callbackURL,
    profileFields: ['id', 'email', 'first_name', 'last_name']
  },
  function(token, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({ 'facebook.id': profile.id }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          var newUser = new User();
          newUser.username = profile.name.givenName + ' ' + profile.name.familyName;
          newUser.facebook.id = profile.id;
          newUser.facebook.token = token;
          newUser.newUser = true;
          newUser.save(function(err) {
            if (err) {
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));
}