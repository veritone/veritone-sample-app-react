import { expect } from 'chai';
import { get } from 'lodash';
import { call, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { refreshToken, handleLogout, logoutIfUnauthorized } from './sagas';
import { refreshApiToken, userIsAuthenticated, logout } from 'modules/user';

describe('user sagas', function() {
  describe('token refresh', function() {
    it('returns if the user is not authed', function() {
      let gen = refreshToken();

      let next = gen.next();
      expect(next.value).to.eql(
        select(userIsAuthenticated),
        'must check user auth'
      );

      next = gen.next(false);
      expect(next.value).to.eql(
        call(delay, 2 * 60 * 60 * 1000),
        'must call delay'
      );

      next = gen.next();
      expect(next.done).to.equal(true, 'must finish if user was not authed');
    });

    it('works', function() {
      let gen = refreshToken();

      gen.next();

      // todo: use cloneableGenerator once redux-saga pushes a release with it
      // todo: better way to express this -- the endpoint function won't compare
      const actionPath = ['PUT', 'action', '@@redux-api-middleware/RSAA'];
      let a1 = get(gen.next(true).value, actionPath);
      let a2 = get(put(refreshApiToken()), actionPath);

      expect(a1.types).to.deep.equal(a2.types);

      expect(gen.next().value).to.deep.equal(
        call(delay, 2 * 60 * 60 * 1000),
        'delays for 2 hours after refreshing'
      );
    });
  });

  describe('logout', function() {
    it('reloads the window after logout_success', function() {
      let gen = handleLogout();

      let next = gen.next();
      expect(next.value).to.eql(
        call([window.location, window.location.reload]),
        'must call reload with the correct context'
      );
    });

    it('calls logout if any api call results in a 401', function() {
      let gen = logoutIfUnauthorized({
        payload: { status: 404 },
        error: true
      });

      // 404 ignored
      expect(gen.next().done).to.be.true;

      gen = logoutIfUnauthorized({
        payload: { status: 401 },
        error: true
      });

      let next = gen.next();
      expect(next.value).to.eql(
        select(userIsAuthenticated),
        'must verify user is authenticated'
      );

      next = gen.next(true);
      const actionPath = ['PUT', 'action', '@@redux-api-middleware/RSAA'];
      let a1 = get(next.value, actionPath);
      let a2 = get(put(logout()), actionPath);

      expect(a1.types).to.deep.equal(a2.types, 'must call logout');
    });
  });
});
