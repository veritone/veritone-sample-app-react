if (process.env.NODE_ENV === 'development') {
  // this is injected into index.html in prod mode
  window.config = require('./dev-config.json');
}
