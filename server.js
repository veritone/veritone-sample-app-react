const fs = require('fs');
const path = require('path');
const express = require('express');
const compression = require('compression');
const cheerio = require('cheerio');
const cookieParser = require('cookie-parser');
const nodeConfig = require('node-config');
const cors = require('cors');
const unirest = require('unirest');
const url = require('url');
const http = require('http');
const Cookies = require('universal-cookie');


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

var corsOptions = {
  origin: function (origin, callback) {
    if (config.clientOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}


// express app
// --------------------------------
const app = express();


// common app handlers
// --------------------------------
app.use(cookieParser());
app.use(compression());


// allow static file serving
// --------------------------------
app.use('/static', express.static('build/static'));


// middleware
// --------------------------------
app.use(function (req, res, next) {
  next();
});


// (get) get veritone session id if exists)
// --------------------------------
app.get('/oauth', cors(corsOptions), (req, res) => {
  if(req.headers.cookie === undefined) {
    return res.json({
      id: null,
      error: 'no session found'
    });
  }
  const cookies = new Cookies(req.headers.cookie);
  if(req.query.client == config.clientId) {
    try {
      res.json({
        id: cookies.get(config.cookies.name.veritone)
      });
    } catch(e) {
      res.json({
        id: null,
        error: e
      });
    }
  } else {
    res.json({
      id: null,
      error: 'invalid clientId'
    });
  }
});


// (post) post for access token
// --------------------------------
app.post('/oauth', cors(corsOptions), (req, res) => {
  const code = req.query.code;
  getAccessToken(code, function(payload) {
    res.json(payload);
  })
});


// exchange code for token
// --------------------------------
function getAccessToken(accessCode, callback) {
  const url = `${config.endpoints.token}?client_id=${config.clientId}&client_secret=${config.clientSecret}&code=${accessCode}&grant_type=${config.clientGrantType}&redirect_uri=${config.clientRedirect}`;
  unirest.post(url)
  .headers({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
  .send({
    client_id: settings.clientId || config.clientId,
    client_secret: settings.clientSecret || config.clientSecret,
    redirect_uri: settings.clientRedirect || config.clientRedirect,
    grant_type: settings.clientGrantType || config.clientGrantType,
    code: accessCode
  })
  .end(response => {
    callback({
      code: accessCode,
      token: response.body,
      response: response.statusCode
    })
  });
}


// start server
// --------------------------------
app.listen(settings.port, settings.host, err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('🐬  App is listening at http://%s:%s', settings.host, settings.port);
});
