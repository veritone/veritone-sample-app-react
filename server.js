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
  clientUserSessionToken: 'bfac6081-24ca-4af0-82cf-4dace9af5118',
  clientOrigin: 'http://local.veritone.com:3000',
  clientRedirect: 'http://local.veritone.com:3000',
  clientScope: 'readall',
  clientGrantType: 'authorization_code'
};

app.use(function (req, res, next) {
  next(); //console.log('OAUTH MIDDLEWARE:', Date.now());
});

app.get('/oauth', (req, res) => {
  res.json(appConfig);
});

app.options('/oauth', cors())
app.post('/oauth', (req, res) => {
  const code = req.query.code;
  getAccessToken(code, function(payload) {
    res.json(payload);
  })
});

function getAccessToken(accessCode, callback) {
  console.log(`--> [ACCESS CODE] ${accessCode}`);
  const url = `${appConfig.endpointToken}?client_id=${appConfig.clientId}&client_secret=${appConfig.clientSecret}&code=${accessCode}&grant_type=${appConfig.clientGrantType}&redirect_uri=${appConfig.clientRedirect}`;
  unirest.post(url)
  .headers({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
  .send({
    client_id: appConfig.clientId,
    client_secret: appConfig.clientSecret,
    redirect_uri: appConfig.clientRedirect,
    grant_type: appConfig.clientGrantType,
    code: accessCode
  })
  .end(function (response) {
    console.log(response.body);
    const payload = {
      code: accessCode,
      token: response.body,
      response: response
    };
    callback(payload)
  });
}

app.listen(port, host, err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('🐬  App is listening at http://%s:%s', host, port);
});

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
