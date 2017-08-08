import React from 'react';
import { render } from 'react-dom';
import { uniqueId } from 'lodash';
import { CookiesProvider } from 'react-cookie';

import './devConfig';
import './polyfill';
import './sentry';

import 'normalize.css';
import './styles/global.css';
import './styles/theme.css';
import './styles/typography.css';

import { RootComponent, runConfig } from './configure';

import './App.css';
import App from './App';

import { boot } from 'modules/boot';
import { fetchUser } from 'modules/user';

const { store, history, rootRoute } = runConfig();

const AppMarkup = () => {
  let markup = (
    <CookiesProvider>
      <App />
    </CookiesProvider>
  );
  return markup;
};

//



// kick off app by loading initial resources
Promise.resolve(store.dispatch(boot()))
  //.then(() => store.dispatch(fetchUser()))
  .then(() => {
    // Render the React application to the DOM
    render(AppMarkup(), document.getElementById('root'));

    // hide initial loading screen (compiled into index.ejs)
    return (document.getElementById('loader').innerHTML = '');
  });

// hook up hot reload for live updates in dev
if (module.hot) {
  module.hot.accept('./configure', () => {
    render(AppMarkup(), document.getElementById('root'));
  });
}


//ReactDOM.render(<App />, document.getElementById('root'));

// export default function Root() {
//   return (
//     <CookiesProvider>
//       <App />
//     </CookiesProvider>
//   );
// }

//
//ReactDOM.render(<App />, document.getElementById('root'));

// Promise.resolve(store.dispatch(boot()));
// .then(() => store.dispatch(fetchUser()));
//
// if (module.hot) {
//   module.hot.accept('./App', () => {
//     ReactDOM.render(<App hash={uniqueId()} />, document.getElementById('root'));
//   });
// }
