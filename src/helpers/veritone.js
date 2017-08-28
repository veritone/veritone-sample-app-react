import Cookies from 'universal-cookie';
import stagedConfig from './stage.json';

const cookies = new Cookies();

const config = {
  endpoints: {
    api: 'https://api.aws-dev.veritone.com',
    login: 'https://www.aws-dev.veritone.com/login',
    authorize: 'https://api.aws-dev.veritone.com/v1/admin/oauth/authorize',
    token: 'https://api.aws-dev.veritone.com/v1/admin/oauth/token',
    code: 'http://local.veritone.com:9000/oauth'
  },
  cookies: {
    domain: '.veritone.com',
    path: '/',
    expire: 604800,
    name: {
      session: 'veritone-auth-session-token',
      code: 'veritone-auth-access-code',
      token: 'veritone-auth-access-token',
      timestamp: 'veritone-auth-access-timestamp'
    }
  }
};

class Veritone {
  constructor() {
    this.setCookie('timestamp', new Date().toISOString() );
    this.config = config;
  }
  getConfig() {
    return config;
  }
  getCookie(name) {
    return cookies.get(config.cookies.name[name]);
  }
  setCookie(name, value) {
    cookies.set(config.cookies.name[name], value, {
      path: config.cookies.path,
      domain: config.cookies.domain,
      maxAge: config.cookies.expire
    });
  }

  clearCookies() {
    cookies.remove(config.cookies.name.session);
    cookies.remove(config.cookies.name.code);
    cookies.remove(config.cookies.name.token);
    cookies.remove(config.cookies.name.timestamp);
  }

  validateSession(params) {
    if(this.getCookie('session') === undefined) {
      this.setCookie('session', stagedConfig.clientUserSessionToken);
      window.location = `${this.config.endpoints.login}?redirect=${stagedConfig.clientRedirect}%3Ftoken%3D${stagedConfig.clientUserSessionToken}`;
    }
  }

  validateCode(params) {
    this.setCookie('session', params.token);
    const url = `${this.config.endpoints.authorize}?response_type=code&client_id=${stagedConfig.clientId}&redirect_uri=${stagedConfig.clientRedirect}&scope=${stagedConfig.clientScope}`;
    window.location = url;
  }

  validateToken(params) {
    this.setCookie('code', params.code);
    fetch(`${this.config.endpoints.code}?code=${params.code}`, {
      method: "post"
    })
    .then((resp) => resp.json())
    .then(function(data) {
      try {
        if(data.token.access_token) {
          this.setCookie('token', data.token.access_token);
        }
      } catch(e) {
        this.clearCookies();
      }
    }).catch(function(err) {
      // nothing
    });
  }
}


export default new Veritone();
