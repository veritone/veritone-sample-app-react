const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const Strategy = require('passport-veritone');


// init env vars
// --------------------------------
dotenv.config({ path: '.env.development' });


// settings
// --------------------------------
const settings = {
  host: '0.0.0.0',
  port: process.env.NODE_PORT || 9000,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
};


// express app
// --------------------------------
const app = express();
app.use(cors());

// common app handlers
// --------------------------------
app.use(cookieParser());
app.use(compression());


// initalize passport
// --------------------------------
app.use(passport.initialize());


// allow static file serving
// --------------------------------
app.use('/static', express.static('build/static'));


// middleware
// --------------------------------
app.use(function (req, res, next) {
  next();
});


// Use the VeritoneStrategy within Passport.
passport.use(new Strategy({
  clientID: settings.clientId,
  clientSecret: settings.clientSecret,
  callbackURL: settings.callbackURL
}, function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

app.get('/auth/veritone', passport.authenticate('veritone'));

app.get('/auth/veritone/callback',
  passport.authenticate('veritone', { session: false }), (req, res) => {
    // fixme: in prod, this needs to send index.html, i think
    res
      .cookie('oauthToken', req.user.oauthToken, {
        secure: false,
        httpOnly: false
      })
      .redirect(302, `http://local.veritone.com:3000`);
  });


// start server
// --------------------------------
app.listen(settings.port, settings.host, err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('🐬  App is listening at http://%s:%s', settings.host, settings.port);
});
