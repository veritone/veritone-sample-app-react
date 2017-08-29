import Cookies from 'universal-cookie';
import config from '../config.json';

const cookies = new Cookies();

class Veritone {
  constructor() {
    this.config = config;
    this.uptime = new Date();
    this.auth = {
      code: null,
      session: null,
      token: null
    };
    if(cookies.get('veritone-auth-access-token')) {
      this.auth.token = cookies.get('veritone-auth-access-token');
    }
    if(cookies.get('veritone-auth-access-code')) {
      this.auth.code = cookies.get('veritone-auth-access-code');
    }
    if(cookies.get('veritone-auth-session-token')) {
      this.auth.session = cookies.get('veritone-auth-session-token');
    }
  }
  connect(params) {

    if(params.code !== undefined) {
      this.auth.code = params.code;
    }

    if(params.token !== undefined) {
      this.auth.token = params.token;
    }

    if(!this.auth.session) {
      this.recoverGlobalSession();
    } else {
      if(!this.auth.token) {
        if(!this.auth.code && this.auth.token === null) {
          return window.location = `${config.endpoints.authorize}?response_type=code&client_id=${config.clientId}&redirect_uri=${config.clientRedirect}&scope=${config.clientScope}`;
        } else {
          fetch(`${config.endpoints.code}?code=${this.auth.code}`, {
            method: "post"
          })
          .then((resp) => resp.json())
          .then(function(data) {
            // data back from exchanging code
            if(data.token && data.token.access_token) {
              const cookies = new Cookies();
              cookies.set(config.cookies.name['token'], data.token.access_token, {
                path: config.cookies.path,
                domain: config.cookies.domain,
                maxAge: config.cookies.expire
              });
              return window.location = config.clientRedirect;
            }
          }).catch(function(err) {
            // nothing
            console.info(err);
          });
        }
      }
    }
  }
  recoverGlobalSession() {
    fetch(`${config.endpoints.oauth}?client=${config.clientId}`, {
      method: "get",
      credentials: 'include'
    })
    .then((resp) => resp.json())
    .then(function(data) {
      if (data.id && data.id !== null) {
        const cookies = new Cookies();
        cookies.set('veritone-auth-session-token', data.id, {
          path: config.cookies.path,
          domain: config.cookies.domain,
          maxAge: config.cookies.expire
        });
        return window.location = config.clientRedirect;
      } else {
        return window.location = `${config.endpoints.login}?redirect=${config.clientRedirect}`;
      }
    }).catch(function(err) {
      // error
    });
  }
  getConfig() {
    return config;
  }
  getCookie(name) {
    return cookies.get(config.cookies.name[name]);
  }
  setCookie(name, value) {
    const cookies = new Cookies();
    cookies.set(config.cookies.name[name], value, {
      path: config.cookies.path,
      domain: config.cookies.domain,
      maxAge: config.cookies.expire
    });
  }
  clearCookies() {
    const cookies = new Cookies();
    cookies.remove(config.cookies.name.session);
    cookies.remove(config.cookies.name.code);
    cookies.remove(config.cookies.name.token);
    cookies.remove(config.cookies.name.timestamp);
  }
}

export default new Veritone();
