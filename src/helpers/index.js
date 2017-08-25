import React from 'react';
import Cookies from 'universal-cookie';
import { parse } from 'qs';

const cookies = new Cookies();

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


  // cookies.set('myCat', 'Pacman', { path: '/' });


/**
 * Temporary Configuration
 * @return {OBJECT}
 */
const appConfig = {
  endpointApi: 'https://api.aws-dev.veritone.com',
  endpointLogin: 'https://www.aws-dev.veritone.com/login',
  endpointAuthorize: 'https://api.aws-dev.veritone.com/v1/admin/oauth/authorize',
  endpointToken: 'https://api.aws-dev.veritone.com/v1/admin/oauth/token',
  clientId: 'e5d90340-f4fc-4054-bbd9-a4bd727f1f95',
  clientSecret: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
  clientUserSessionToken: 'bfac6081-24ca-4af0-82cf-4dace9af5118',
  clientOrigin: 'http://local.veritone.com:3000',
  clientRedirect: 'http://local.veritone.com:3000',
  clientScope: 'readall', // or read
  clientGrantType: 'authorization_code'
};


/**
 * API Configuration
 * @return {OBJECT}
 */
export function ApiConfiguration(attrs) {
  return {
    token: cookies.get('veritone-auth-session-token'),
    accessCode: cookies.get('veritone-auth-access-code'),
    accessToken: cookies.get('veritone-auth-access-token'),
    baseUrl: appConfig.endpointApi
  }
}


/**
 * Returns query string from url
 * @return {OBJECT} - query string key value
 */
export function AuthFlow() {
  const params = parse(window.location.search.substring(1));
  if(params.token === undefined && params.code === undefined) {
    AuthProcessVeritoneLogin(params); // 1
  } else if(params.token && params.code === undefined) {
    AuthProcessAccessCode(params); // 2
  } else if(params.code && params.token === undefined) {
    return AuthProcessAccessToken(params); // 3
  } else {
    AuthProcessDefault(params); // 4
  }
}


/**
 * Returns query string from url
 * @return {OBJECT} - query string key value
 */
function AuthProcessVeritoneLogin(params) {
  if(cookies.get('veritone-auth-session-token') === undefined) {
    // defaulty set
    cookies.set('veritone-auth-session-token', appConfig.clientUserSessionToken, { path: '/', domain: '.veritone.com' });

    console.log(`[ OAUTH STEP 1 ] => If there are no codes or tokens [${params.token}, ${params.code}]`);
    window.location = `${appConfig.endpointLogin}?redirect=${appConfig.clientRedirect}%3Ftoken%3D${appConfig.clientUserSessionToken}`;
  }
}


/**
 * Returns query string from url
 * @return {OBJECT} - query string key value
 */
function AuthProcessAccessCode(params) {
  console.log(`[ OAUTH STEP 2 ] => If we have token but no code [${params.token}, ${params.code}]`);
  cookies.set('veritone-auth-session-token', params.token, { path: '/', domain: '.veritone.com' });
  const url = `${appConfig.endpointAuthorize}?response_type=code&client_id=${appConfig.clientId}&redirect_uri=${appConfig.clientRedirect}&scope=${appConfig.clientScope}`;
  window.location = url;
}


/**
 * Returns query string from url
 * @return {OBJECT} - query string key value
 */
function AuthProcessAccessToken(params) {
  console.log(`[ OAUTH STEP 3 ] => If we have code but no token [${params.token}, ${params.code}]`);
  cookies.set('veritone-auth-access-code', params.code, { path: '/', domain: '.veritone.com' });
  let codeUrl = `http://local.veritone.com:9000/oauth?code=${params.code}`;
  fetch(codeUrl, {
    method: "post"
  })
  .then((resp) => resp.json())
  .then(function(data) {
    try {
      if(data.token.access_token) {
        cookies.set('veritone-auth-access-token', data.token.access_token, { path: '/', domain: '.veritone.com' });
      }
    } catch(e) {
      console.error(e);
    }
    //
  }).catch(function(err) {
    cookies.remove('veritone-auth-access-code');
    cookies.remove('veritone-auth-access-token');
  });
}


/**
 * Returns query string from url
 * @return {OBJECT} - query string key value
 */
function AuthProcessDefault(params) {
  console.log(`[ OAUTH STEP 4 ] => If we hit no other conditionals [${params.token}, ${params.code}]`);
  return {
    token: appConfig.clientUserSessionToken,
    baseUrl: appConfig.endpointApi
  }
}


//
//
//
// attrs.then(function(data) {
//   return {
//     token: tokens.session || '',
//     accessToken: data.token.access_token || '',
//     baseUrl: appConfig.endpointApi || ''
//   }
// }).catch(function(err) {
//   console.log(err);
// })





// var tokens = {
//   api: null,
//   session: appConfig.clientUserSessionToken,
//   token: null
// }
//
// apiConfig
//   .then(function(codes) {
//   return {
//     token: tokens.session,
//     accessToken: codes.token.access_token || '',
//     baseUrl:
//   }
// }).catch(function() {
//   return {
//     token: tokens.session,
//     baseUrl: appConfig.endpointApi
//   }
// })


/**
 * Returns query string from url
 * @return {OBJECT} - query string key value
 */
// export function getQuery() {
//   const q = window.location.search.substring(1);
//   return (q === undefined ? window.location = "https//www.aws-dev.veritone.com/login" : parse(q) );
// }

// /**
//  * Returns query string from url
//  * @return {OBJECT} - query string key value
//  */
// function AuthX(code) {
//   //const url = `${appConfig.endpointAuthorize}?response_type=code&client_id=${appConfig.clientId}&redirect_uri=${appConfig.clientRedirect}&scope=${appConfig.clientScope}`;
//
//   const url = `http://local.veritone.com:9000/oauth?code=${code}`;
//   console.log(url);
//   fetch(url, {
//     method: "post",
//     headers: {
//       "authorization": "bearer " + appConfig.clientExampleToken
//     }
//   })
//   .then(response => {
//     console.log('cat', response)
//   })
//   .catch(error => {
//     console.log('dog', error);
//   });
// }

  //AuthProcessAccessCode(appConfig, params.code);
  //const url = `${appConfig.endpointAuthorize}?response_type=code&client_id=${appConfig.clientId}&redirect_uri=${appConfig.clientRedirect}&scope=${appConfig.clientScope}`;
  //window.location = url;
  // console.log(url);
  // AuthX(params.code);
  //
  // return;

  // if(params.token) {
  //   AuthProcessSessionToken(appConfig, params.token);
  //   return {
  //     token: params.token,
  //     Origin: null,
  //     baseUrl: appConfig.endpointApi
  //   }
  // } else {
  //   window.location = `${appConfig.endpointLogin}?redirect=${appConfig.clientRedirect}%3Ftoken%3D${appConfig.clientExampleToken}`;
  // }
//
// function AuthProcessSessionToken(appConfig, token) {
//   // console.log('[Step 1]: Processing Session Token', token);
//   localStorage.setItem('dev-veritone-session-id', token);
//   const url = `${appConfig.endpointAuthorize}?response_type=code&client_id=${appConfig.clientId}&redirect_uri=${appConfig.clientRedirect}&scope=${appConfig.clientScope}`;
//   window.location = url;
//   // console.log(url);
//   // fetch(url, {
//   //   method: "get",
//   //   headers: {
//   //     "authorization": "bearer " + appConfig.clientExampleToken
//   //   }
//   // })
//   // .then(response => {
//   //   console.log('cat', response)
//   // })
//   // .catch(error => {
//   //   console.log('dog', error);
//   // });
// }
