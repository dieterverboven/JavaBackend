const Gebruiker = require('./api/models/Gebruiker');
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

passport.use('local', new LocalStrategy({
    usernameField: 'naam',
    passwordField: 'passwoord'
},
    function(username, password, done) {
      Gebruiker.findOne({ naam: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
      });
    }
  ));