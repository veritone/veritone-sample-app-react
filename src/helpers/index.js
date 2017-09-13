import { parse } from 'qs';


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
 * Returns query string from url
 * @return {OBJECT} - query string key value
 */
export function getQuery() {
  return parse(window.location.search.substring(1));
}
