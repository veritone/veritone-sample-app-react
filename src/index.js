import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import veritoneApi from 'veritone-api/dist/bundle-node.js';
import { AuthFlow, ApiConfiguration } from 'helpers';
import user, { namespace as userNamespace } from 'modules/user';


// Polyfill
// -----------------------------------
import './polyfill';


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


// Veritone API Client Initalization
// ------------------------------------
const client = veritoneApi(ApiConfiguration(AuthFlow()));


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
