import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import veritoneApi from 'veritone-api';
import { getQueryStringValue } from 'helpers';

import user, { namespace as userNamespace } from 'modules/user';

import './polyfill';

import 'normalize.css';
import './styles/global.css';
import './styles/theme.css';
import './styles/typography.css';

import './plugins/app/styles/index.scss';
import App from './plugins/app/App';


// Veritone API Client Initalization
// ------------------------------------
const client = veritoneApi({ token: getQueryStringValue('apiToken') })


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
  /* fixme reducers */
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
    <App />
  </Provider>,
  document.getElementById('root')
);
