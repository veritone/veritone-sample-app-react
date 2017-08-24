import { parse } from 'qs';

/**
 * Returns query string from url
 * @return {OBJECT} - query string key value
 */
export function getQuery() {
  const q = window.location.search.substring(1);
  return (q === undefined ? window.location = "https//www.aws-dev.veritone.com/login" : parse(q) );
}

/**
 * Returns query string from url
 * @return {OBJECT} - query string key value
 */
export function AuthFlow() {

  const appConfig = {
    endpointApi: 'https://api.aws-dev.veritone.com',
    endpointLogin: 'https://www.aws-dev.veritone.com/login',
    endpointAuthorize: 'https://api.aws-dev.veritone.com/v1/admin/oauth/authorize',
    clientId: 'e5d90340-f4fc-4054-bbd9-a4bd727f1f95',
    clientExampleToken: 'a99f8502-8a07-4ae1-9023-46d0c4512dd0',
    clientOrigin: 'http://local.veritone.com:3000',
    clientRedirect: encodeURIComponent('http://local.veritone.com:3000'),
    clientScope: 'readall '
  }
  const params = parse(window.location.search.substring(1));

  if(params.code) {
    AuthProcessAccessCode(appConfig, params.code);
  }

  if(params.token) {
    AuthProcessSessionToken(appConfig, params.token);
    return {
      token: params.token,
      Origin: null,
      baseUrl: appConfig.endpointApi
    }
  } else {
    window.location = `${appConfig.endpointLogin}?redirect=${appConfig.clientRedirect}%3Ftoken%3D${appConfig.clientExampleToken}`;
  }

}

function AuthProcessSessionToken(appConfig, token) {
  console.log('[Step 1]: Processing Session Token', token);
  localStorage.setItem('dev-veritone-session-id', token);
  const url = `${appConfig.endpointAuthorize}?response_type=code&client_id=${appConfig.clientId}&redirect_uri=${appConfig.clientRedirect}&scope=${appConfig.clientScope}`;
  console.log(url);
  fetch(url, {
    method: "get",
    headers: {
      "authorization": "bearer " + appConfig.clientExampleToken
    }
  })
  .then(response => {
    console.log('cat', response)
  })
  .catch(error => {
    console.log('dog', error);
  });
}

function AuthProcessAccessCode(appConfig, token) {
  console.log('[Step 2]: Processing Access Code', token);
  return;
  AuthProcessAccessToken(appConfig, 'abcd');
}

function AuthProcessAccessToken(appConfig, token) {
  console.log('[Step 3]: Processing Access Token', token);
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
