const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const nodeConfig = require('node-config');
const cors = require('cors');


const passport = require('passport');
const Strategy = require('passport-veritone');



// load config from file
// --------------------------------
let config;
try {
  config = nodeConfig.load();
} catch (e) {
  config = nodeConfig.loadFromLocation('src/config.json');
}


// settings
// --------------------------------
const settings = {
  host: '0.0.0.0',
  port: config.port || 9000,
  clientId: 'e5d77a9b-3ffb-472b-906b-899a559d2bc6',
  clientSecret: 'N9dX40RUsqBVez_xDtEM7zIYeiHEI33gk5ZNIv9V6dbT5RMI3kZSKg'
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
  clientID: 'e5d90340-f4fc-4054-bbd9-a4bd727f1f95',
  clientSecret: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
  callbackURL: 'http://local.veritone.com:9000/auth/veritone/callback'
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
