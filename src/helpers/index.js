import React from 'react';
import Cookies from 'universal-cookie';
import { parse } from 'qs';

// recent additions
import stagedConfig from './stage.json';
const cookies = new Cookies();


/**
 * generic set cookie function
 * @return null
 */
function setCookie(name, value) {
  cookies.set(name, value, { path: '/', domain: '.veritone.com', maxAge: 604800 });
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
 * @return {OBJECT}
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
 * @return {OBJECT}
 */
export function GetApplicationState() {
  return {
    session: cookies.get('veritone-auth-session-token'),
    code: cookies.get('veritone-auth-access-code'),
    token: cookies.get('veritone-auth-access-token'),
    queries: parse(window.location.search.substring(1)),
    api: stagedConfig.endpointApi
  }
}


/**
 * Basic auth flow handler
 * @return null
 */
export function AuthFlow() {
  const params = parse(window.location.search.substring(1));
  if(params.token === undefined && params.code === undefined) {
    AuthProcessVeritoneLogin(params); // 1
  } else if(params.token && params.code === undefined) {
    AuthProcessAccessCode(params); // 2
  } else if(params.code && params.token === undefined) {
    AuthProcessAccessToken(params); // 3
  }
}


/**
 * Returns query string from url
 * @return {OBJECT} - query string key value
 */
function AuthProcessVeritoneLogin(params) {
  if(cookies.get('veritone-auth-session-token') === undefined) {
    //console.log(`[ OAUTH STEP 1 ] => If there are no codes or tokens [${params.token}, ${params.code}]`);
    setCookie('veritone-auth-session-token', stagedConfig.clientUserSessionToken);
    window.location = `${stagedConfig.endpointLogin}?redirect=${stagedConfig.clientRedirect}%3Ftoken%3D${stagedConfig.clientUserSessionToken}`;
  }
}


/**
 * Returns query string from url
 * @return {OBJECT} - query string key value
 */
function AuthProcessAccessCode(params) {
  //console.log(`[ OAUTH STEP 2 ] => If we have token but no code [${params.token}, ${params.code}]`);
  setCookie('veritone-auth-session-token', params.token);
  const url = `${stagedConfig.endpointAuthorize}?response_type=code&client_id=${stagedConfig.clientId}&redirect_uri=${stagedConfig.clientRedirect}&scope=${stagedConfig.clientScope}`;
  window.location = url;
}


/**
 * Returns query string from url
 * @return {OBJECT} - query string key value
 */
function AuthProcessAccessToken(params) {
  //console.log(`[ OAUTH STEP 3 ] => If we have code but no token [${params.token}, ${params.code}]`);
  setCookie('veritone-auth-access-code', params.code);
  fetch(`http://local.veritone.com:9000/oauth?code=${params.code}`, {
    method: "post"
  })
  .then((resp) => resp.json())
  .then(function(data) {
    try {
      if(data.token.access_token) {
        setCookie('veritone-auth-access-token', data.token.access_token);
      }
    } catch(e) {
      console.error(e);
    }
  }).catch(function(err) {
    cookies.remove('veritone-auth-access-code');
    cookies.remove('veritone-auth-access-token');
  });
}
