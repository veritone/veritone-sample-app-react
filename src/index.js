import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import Cookies from 'universal-cookie';


// Polyfill
// -----------------------------------
import './polyfill';

import { apiMiddleware } from 'redux-api-middleware-fixed';
import { modules } from 'veritone-redux-common';


// Veritone Client SDK
// -----------------------------------
import veritoneApi from 'veritone-client-js/dist/bundle-browser.js';

// Media Module
// -----------------------------------
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
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';


const cookies = new Cookies();
const oauthToken = cookies.get('oauthToken');

if (!oauthToken) {
  window.location.replace('/auth/veritone');
} else {
  init();
}


function init() {
  // Veritone API Client Initalization
  // ------------------------------------
  const client = veritoneApi({
    oauthToken,
    baseUrl: 'https://api.aws-dev.veritone.com',
  });

  // Middleware
  // -----------------------------------
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


  // Enhancers
  // -----------------------------------
  const enhancer = composeEnhancers(
    applyMiddleware(
      thunkMiddleware.withExtraArgument(client),
      apiMiddleware(fetch)
    ),
  );



  // Store Initialization
  // ------------------------------------
  const store = createStore(
    combineReducers({
      [modules.user.namespace]: modules.user.reducer,
      // [userNamespace]: user,
      [mediaExampleNamespace]: mediaExample
    }),
    {},
    enhancer
  );


  // // Render
  // // ------------------------------------
  render(
    <Provider store={store}>
      <MuiThemeProvider
        theme={createMuiTheme({
          palette: {
            primary: blue
          },
          typography: {
            button: {
              fontWeight: 400
            }
          }
        })}
      >
        <App />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
  );
}

