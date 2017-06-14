// hack around https://github.com/gaearon/react-hot-loader/issues/303
if (process.env.NODE_ENV === 'development') {
  require('./components/LoginPage');
}

export default store => ({
  path: 'login',

  getComponent: (nextState, cb) => {
    import(/* webpackChunkName: "login" */ './components/LoginPage')
      .then(loadRoute(cb))
      .catch(errorLoading);
  }
});

function errorLoading(err) {
  console.error('Dynamic page loading failed', err);
}

function loadRoute(cb) {
  return module => cb(null, module.default);
}
