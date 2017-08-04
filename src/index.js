import React from 'react';
import ReactDOM from 'react-dom';
import { uniqueId } from 'lodash';

import './devConfig';
import './polyfill';
import './sentry';

import 'normalize.css';
import './styles/global.css';
import './styles/theme.css';
import './styles/typography.css';

import { RootComponent, runConfig } from './configure';

import './App.css';
import App from './plugins/app/App';

const { store, history, rootRoute } = runConfig();

ReactDOM.render(<App />, document.getElementById('root'));

// Promise.resolve(store.dispatch(boot()));
// .then(() => store.dispatch(fetchUser()));

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(<App hash={uniqueId()} />, document.getElementById('root'));
  });
}
