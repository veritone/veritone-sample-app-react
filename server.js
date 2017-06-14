const fs = require('fs');
const path = require('path');
const express = require('express');
const compression = require('compression');
const cheerio = require('cheerio');
const cookieParser = require('cookie-parser');
const nodeConfig = require('node-config');

let config;
try {
  config = nodeConfig.load();
} catch (e) {
  config = nodeConfig.loadFromLocation('src/dev-config.json');
}

const app = express();
const host = '0.0.0.0';
const port = config.port || 9000;

const logger = require('node-logger')(config);
const serverLib = require('veritone-lib/app-server')(config, logger);

app.use(cookieParser());
serverLib.routes.mountAppSwitchingRoute(app);

let indexHtml;
try {
  indexHtml = fs.readFileSync('build/index.html', 'utf8');
} catch (e) {
  console.error(e);
}

const $indexHtml = cheerio.load(indexHtml);
const newConfig = `<script id="injected-config">
      window.config = ${JSON.stringify(config)}
  </script>`;

if ($indexHtml('#injected-config').length) {
  // config exists, overwrite
  $indexHtml('#injected-config').replaceWith(newConfig);

  console.log('existing config found in index.html; replaced with new config');
} else {
  $indexHtml('head').append(newConfig);

  console.log('no existing config found in index.html; added config');
}
const indexWithConfig = $indexHtml.html();
fs.writeFileSync('build/index.html', indexWithConfig);
console.log('wrote index.html with injected config');

app.use(compression());
app.use('/static', express.static('build/static'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(port, host, err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('🐬  App is listening at http://%s:%s', host, port);
});
