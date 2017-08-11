import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import veritoneApi from 'veritone-api';
import { parseQueryString } from 'helpers';

import user, { namespace as userNamespace } from 'modules/user';

import './polyfill';

import 'normalize.css';
import './styles/global.css';
import './styles/theme.css';
import './styles/typography.css';

import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


// Veritone API Client Initalization
// ------------------------------------
const client = veritoneApi({
  token: parseQueryString('apiToken'),
  baseUrl: "https://api.aws-dev.veritone.com"
})


// Middleware
// -----------------------------------
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunkMiddleware.withExtraArgument(client)
  )
);


// Store Initialization
// ------------------------------------
const store = createStore(
  combineReducers({
    [userNamespace]: user
  }),
  {},
  enhancer
);


// Render
// ------------------------------------
render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
