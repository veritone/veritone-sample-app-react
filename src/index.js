import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import Cookies from 'universal-cookie';


// Polyfill
// -----------------------------------
import './polyfill';


// Veritone Client SDK
// -----------------------------------
import veritoneApi from 'veritone-client-js/dist/bundle-browser.js';


// User Module with REST and GQL
// -----------------------------------
import user, {
  namespace as userNamespace
} from './modules/user';
import userGql, {
  namespace as userNamespaceGql
} from './modules/user-gql';

// Media Module with REST and GQL
import mediaExample, {
  namespace as mediaExampleNamespace
} from './modules/mediaExample';
import mediaExampleGql, {
  namespace as mediaExampleNamespaceGql
} from './modules/mediaExample-gql';

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

import { gqlClient } from './helpers/index';

injectTapEventPlugin();


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
    oauthToken
  });

  // Middleware
  // -----------------------------------
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


  // Enhancers
  // -----------------------------------
  const getThunkMiddleware = () => {
    switch (process.env.REACT_APP_CLIENT_TYPE) {
      case 'GRAPHQL': 
        return thunkMiddleware.withExtraArgument(gqlClient);
      default:
        return thunkMiddleware.withExtraArgument(client);
    }
  }
  const enhancer = composeEnhancers(
    applyMiddleware(getThunkMiddleware())
  );


  // Store Initialization
  // ------------------------------------

  const getReducer = () => {
    switch (process.env.REACT_APP_CLIENT_TYPE) {
      case 'GRAPHQL': 
        return {
          [userNamespaceGql]: userGql,
          [mediaExampleNamespaceGql]: mediaExampleGql
        };
      default:
        return {
          [userNamespace]: user,
          [mediaExampleNamespace]: mediaExample,
        };
    }
  }

  const store = createStore(
    combineReducers(getReducer()),
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
}

