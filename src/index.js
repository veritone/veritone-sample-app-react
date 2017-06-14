import React from 'react';
import ReactDOM from 'react-dom';
import { uniqueId } from 'lodash';

import './polyfill';
import './sentry';

import 'normalize.css';
import './styles/global.css';
import './styles/theme.css';
import './styles/typography.css';

import './App.css';
import App from './App';
ReactDOM.render(<App />, document.getElementById('root'));

// Promise.resolve(store.dispatch(boot()))
// .then(() => store.dispatch(fetchUser()));

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(<App hash={uniqueId()} />, document.getElementById('root'));
  });
}
