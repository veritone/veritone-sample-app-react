import Cookies from 'universal-cookie';
import config from '../config.json';

const cookies = new Cookies();

class Veritone {
  constructor() {
    this.config = config;
    this.error = null;
    this.uptime = new Date();
    this.auth = {
      code: null,
      token: null
    };
    if(cookies.get('veritone-auth-access-token')) {
      this.auth.token = cookies.get('veritone-auth-access-token');
    }
    if(cookies.get('veritone-auth-access-code')) {
      this.auth.code = cookies.get('veritone-auth-access-code');
    }
  }
  connect(params) {

    if(params.error) {
      return null;
    }

    if(!!params.code) {
      this.auth.code = params.code;
    }
    if(!this.auth.token) {
      if(!!this.auth.code) {
        this.getAccessToken(this.auth.code)
      } else {
        return window.location = this.getAuthorizeUrl();
      }
    }
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
  getLoginUrl() {
    return `${config.endpoints.login}?redirect=${config.clientRedirect}`;
  }
  getAuthorizeUrl() {
    return `${config.endpoints.authorize}?response_type=code&client_id=${config.clientId}&redirect_uri=${config.clientRedirect}&scope=${config.clientScope}`;
  }
  getAccessToken(code) {
    fetch(`${config.endpoints.code}?code=${code}`, {
      method: "post"
    })
    .then((resp) => resp.json())
    .then(function(data) {
      if(data.token) {
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
      } else {
        return window.location = config.clientRedirect;
      }
    }).catch(function(err) {
      // nothing
    });
  }
}

export default new Veritone();
