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

let config;
try {
  config = nodeConfig.load();
} catch (e) {
  config = nodeConfig.loadFromLocation('src/config.json');
}

const app = express();
const host = '0.0.0.0';
const port = config.port || 9000;

//const logger = require('node-logger')(config);
//const serverLib = require('veritone-lib/app-server')(config, logger);

app.use(cors());
app.use(cookieParser());
app.use(compression());

app.use('/static', express.static('build/static'));

const appConfig = {
  endpointApi: 'https://api.aws-dev.veritone.com',
  endpointLogin: 'https://www.aws-dev.veritone.com/login',
  endpointAuthorize: 'https://api.aws-dev.veritone.com/v1/admin/oauth/authorize',
  endpointToken: 'https://api.aws-dev.veritone.com/v1/admin/oauth/token',
  clientId: 'e5d90340-f4fc-4054-bbd9-a4bd727f1f95',
  clientSecret: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
  clientUserSessionToken: 'c4defb85-9ec6-4039-8cd6-daf62d6c0d53',
  clientOrigin: 'http://local.veritone.com:3000',
  clientRedirect: encodeURIComponent('http://local.veritone.com:3000'),
  clientScope: 'read',
  clientGrantType: 'authorization_code'
};

app.use(function (req, res, next) {
  console.log('OAUTH MIDDLEWARE:', Date.now());
  next();
})

function getAccessCode(callback) {
  const url = `${appConfig.endpointAuthorize}?response_type=code&client_id=${appConfig.clientId}&redirect_uri=${appConfig.clientRedirect}&scope=${appConfig.clientScope}`;
  unirest.get(url)
  .headers({
    'authorization': 'bearer '+ appConfig.clientUserSessionToken,
    'accept': 'application/json',
    'content-type': 'application/json'
  })
  .send({

  })
  .end(function (response) {
    let requestQuery = require('url').parse(response.request.uri, true).query;
    const oauthAccessCode = requestQuery.split("=")[1];
    callback(oauthAccessCode);
  });
};

function getAccessToken(accessCode, callback) {
  //const url = `${appConfig.endpointToken}?response_type=code&client_id=${appConfig.clientId}&redirect_uri=${appConfig.clientRedirect}&scope=${appConfig.clientScope}`;
  const url = `${appConfig.endpointToken}`; //?client_id=${appConfig.clientId}&client_secret=${appConfig.clientSecret}&code=${accessCode}&grant_type=authorization_code&redirect_uri=${appConfig.clientRedirect}
  console.log('----------------------');
  console.log(url);
  console.log('----------------------');
  unirest.post(url)
  .headers({
    'authorization': 'bearer ' + appConfig.clientUserSessionToken,
    'Content-Type': 'application/x-www-form-urlencoded'})
  .send({
    client_id: appConfig.clientId,
    client_secret: appConfig.clientSecret,
    code: accessCode,
    grant_type: appConfig.clientGrantType,
    redirect_uri: appConfig.clientRedirect
  })
  .end(function (response) {
    //console.log('-----------> ACCESS_CODE:', oauthAccessCode);
    //console.log('---> ', response);
    const payload = {
      code: accessCode,
      token: '',
      response: response
    };
    callback(payload)
    //callback(payload);
    //let requestQuery = require('url').parse(response.request.uri, true).query;
    //const oauthAccessCode = requestQuery.split("=")[1];
    //callback(oauthAccessCode);
  });
};

app.get('*', (req, res) => {
  getAccessCode(code => {
    console.log('----------------------');
    console.log('code:1', code);
    getAccessToken(code, function(obj) {
      console.log('----------------------');
      console.log('code:2', code);
      console.log('----------------------');
      res.json(obj);
    });
  });
});

app.listen(port, host, err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('🐬  App is listening at http://%s:%s', host, port);
});



  //   curl -X POST \
  // https://api.aws-dev.veritone.com/v1/admin/oauth/token \
  // -H 'content-type: application/x-www-form-urlencoded' \
  // -d 'client_id=820015f9-36ab-454b-b5db-0bf0b36e4495&client_secret=dont%20tell%20jason&code=SBzWtcyvSNY&grant_type=authorization_code&redirect_uri=http%3A%2F%2Fwash.me%2Ftoo'




//serverLib.routes.mountAppSwitchingRoute(app);
//
// let indexHtml;
// try {
//   indexHtml = fs.readFileSync('build/index.html', 'utf8');
// } catch (e) {
//   console.error(e);
// }

//const $indexHtml = cheerio.load(indexHtml);
// const newConfig = `<script id="injected-config">
//       window.config = ${JSON.stringify(config)}
//   </script>`;
//
// if ($indexHtml('#injected-config').length) {
//   // config exists, overwrite
//   $indexHtml('#injected-config').replaceWith(newConfig);
//
//   console.log('existing config found in index.html; replaced with new config');
// } else {
//   $indexHtml('head').append(newConfig);
//
//   console.log('no existing config found in index.html; added config');
// }
// const indexWithConfig = $indexHtml.html();
//fs.writeFileSync('build/index.html', indexWithConfig);
// console.log('wrote index.html with injected config');
