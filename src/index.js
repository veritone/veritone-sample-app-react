import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import Cookies from 'universal-cookie';


// Polyfill
// -----------------------------------
import './polyfill';


// Core & Authentication helpers
// -----------------------------------
// import { AuthFlow, ApiConfiguration } from 'helpers';

import { getQuery } from 'helpers';
// Veritone Client SDK
// -----------------------------------
import veritoneApi from 'veritone-api/dist/bundle-browser.js';


// // User Module
// // -----------------------------------
import user, {
  namespace as userNamespace
} from 'modules/user';


// Media Module
// -----------------------------------
import mediaExample, {
  namespace as mediaExampleNamespace
} from 'modules/mediaExample';


// Global css
// -----------------------------------
import 'normalize.css';
import './styles/global.css';
import './styles/theme.css';
import './styles/typography.css';


// App and Mateiral-UI wrapper
// ------------------------------------
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const cookies = new Cookies();

if (!cookies.get('oauthToken') && !getQuery().oauthToken) {
  window.location.replace('/auth/veritone');
}

// // Veritone API Client Initalization
// // ------------------------------------
const client = veritoneApi({
  oauthToken: getQuery().oauthToken || cookies.get('oauthToken')
});


// Middleware
// -----------------------------------
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// Enhancers
// -----------------------------------
const enhancer = composeEnhancers(
  applyMiddleware(
    thunkMiddleware.withExtraArgument(client)
  )
);


// Store Initialization
// ------------------------------------
const store = createStore(
  combineReducers({
    [userNamespace]: user,
    [mediaExampleNamespace]: mediaExample
  }),
  {},
  enhancer
);


// // Render
// // ------------------------------------
render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
