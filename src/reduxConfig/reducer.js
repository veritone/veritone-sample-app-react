import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import config, { namespace as configNamespace } from 'modules/config';

export default function createReducer(asyncReducers) {
  return combineReducers({
    // global reducers go here. Lazy reducers should be registered in their
    // routes' getComponent with injectAsyncReducer
    routing,
    form: formReducer,
    [configNamespace]: config,
    ...asyncReducers
  });
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}
