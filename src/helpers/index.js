import { parse } from 'qs';

/**
 * Parses url query string value
 * @param {STRING} key - query string key
 * @return {OBJECT} - query string key value
 */
export function parseQueryString(key) {
  const queryObj = parse(window.location.search.substring(1));
  return queryObj[key];
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
