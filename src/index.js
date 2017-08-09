import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import './polyfill';

import 'normalize.css';
import './styles/global.css';
import './styles/theme.css';
import './styles/typography.css';

import './App.css';
import App from './App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    // todo: parse token from query if available and inject into thunk here
    thunkMiddleware.withExtraArgument(/* fixme */)
  )
);

const store = createStore(
  /* fixme reducers */
  state => state,
  {},
  enhancer
);

//"apiRoot": "https://api.aws-dev.veritone.com/v1",

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
