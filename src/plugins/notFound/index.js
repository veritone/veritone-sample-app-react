if (process.env.NODE_ENV === 'development') {
  // hack around https://github.com/gaearon/react-hot-loader/issues/303
  require('./components/NotFound');
}

export default store => ({
  path: '*',

  getComponent: (nextState, cb) => {
    import(/* webpackChunkName: "not-found" */ './components/NotFound')
      .then(loadRoute(cb))
      .catch(errorLoading);
  }
});

function loadRoute(cb) {
  return module => cb(null, module.default);
}

function errorLoading(err) {
  console.error('Dynamic page loading failed', err);
}
