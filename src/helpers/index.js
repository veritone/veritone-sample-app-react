import { parse } from 'qs';
import Veritone from './veritone';

/**
 * Basic auth flow handler
 * @return {Redirect} Multiple Redirects in Flow
 */
export function AuthFlow() {
  const params = parse(window.location.search.substring(1));
  if(params.token === undefined && params.code === undefined) {
    Veritone.validateSession(params);
  } else if(params.token && params.code === undefined) {
    Veritone.validateCode(params);
  } else if(params.code && params.token === undefined) {
    Veritone.validateToken(params);
  }
}

/**
 * Checks whether an object is empty
 * @param  {Object} obj
 * @return {Boolean}
 */
export function isEmpty(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

/**
 * set API configuration
 * @param  {Object} attrs
 * @return {Object}
 */
export function ApiConfiguration(attrs) {
  const state = GetApplicationState();
  return {
    token: state.session,
    accessCode: state.code,
    accessToken: state.token,
    baseUrl: state.api
  }
}

/**
 * Load all configurations from cookies and json
 * @return {Object}
 */
export function GetApplicationState() {
  return {
    session: Veritone.getCookie('session'),
    code: Veritone.getCookie('code'),
    token: Veritone.getCookie('token'),
    queries: parse(window.location.search.substring(1)),
    api: Veritone.config.endpoints.api
  }
}
