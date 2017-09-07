import { parse } from 'qs';
import veritone from './veritone';

/**
 * Basic auth flow handler
 * @return {Redirect} Multiple Redirects in Flow
 */
export function AuthFlow() {
  const params = parse(window.location.search.substring(1));
  veritone.connect(params);
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
    token: state.token,
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
    code: veritone.getCookie('code'),
    token: veritone.getCookie('token'),
    queries: parse(window.location.search.substring(1)),
    api: veritone.config.endpoints.api
  }
}
