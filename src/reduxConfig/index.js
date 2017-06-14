import thunkMiddleware from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware-fixed';
import { batchStoreEnhancer, batchMiddleware } from 'redux-batch-enhancer';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createRavenMiddleware from 'raven-for-redux';

import { getConfig } from 'modules/config';

export const getBaseMiddlewares = () => [
  batchMiddleware,
  apiMiddleware(fetch),
  thunkMiddleware.withExtraArgument(state => getConfig(state)),
  routerMiddleware(browserHistory)
];

export const getDevOnlyMiddlewares = () => {
  if (process.env.NODE_ENV === 'development') {
    return [
      require('redux-validate-fsa')(),
      require('redux-immutable-state-invariant').default(),
      require('redux-logger').createLogger({ collapsed: true })
    ];
  }
};

const Raven = require('raven-js');

export const getProductionOnlyMiddlewares = () => [
  createRavenMiddleware(Raven)
];
export const getBaseStoreEnhancers = () => [batchStoreEnhancer];
export const getDevOnlyStoreEnhancers = () => [];
export const getProductionOnlyStoreEnhancers = () => [];
