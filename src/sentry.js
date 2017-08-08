if (process.env.NODE_ENV !== 'development') {
  const Raven = require('raven-js');

  Raven.config(window.config.sentryDSN, {
    environment: window.config.nodeEnv
  }).install();
}
