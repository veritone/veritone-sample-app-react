import './polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Cookies from 'universal-cookie';
import { apiMiddleware } from 'redux-api-middleware';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import axios from 'axios';

import { modules } from 'veritone-redux-common';
import veritoneApi from 'veritone-client-js/dist/bundle-browser.js';

import mediaExample, {
  namespace as mediaExampleNamespace
} from 'modules/mediaExample';

import 'normalize.css';
import './styles/global.scss';
import './styles/theme.scss';
import './styles/typography.scss';

import App from './App';

const cookies = new Cookies();
const oauthToken = cookies.get('oauthToken');

if (!oauthToken) {
  window.location.replace('/auth/veritone');
} else {
  init();
}

function init() {
  const client = veritoneApi({
    oauthToken,
    baseUrl: 'https://api.veritone.com'
  });
  axios.defaults.baseURL = 'https://api.veritone.com';
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + oauthToken;

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    combineReducers({
      [modules.user.namespace]: modules.user.reducer,
      [modules.config.namespace]: modules.config.reducer,
      [modules.auth.namespace]: modules.auth.reducer,
      [mediaExampleNamespace]: mediaExample
    }),
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware.withExtraArgument(client),
        apiMiddleware // needed by redux-common modules
      )
    )
  );

  store.dispatch(
    modules.config.setConfig({
      apiRoot: 'https://api.veritone.com'
    })
  );

  store.dispatch(
    modules.auth.setOAuthToken(oauthToken)
  );

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
