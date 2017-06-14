import { expect } from 'chai';
import nock from 'nock';
import { makeMockStore } from 'helpers/test/redux';
const mockStore = makeMockStore();

import * as userModule from 'modules/user';

describe('user module actions', function() {
  afterEach(function() {
    nock.cleanAll();
  });

  describe('login', function() {
    it('exists', function() {
      expect(userModule.login).to.be.a('function');
    });

    it('makes a POST API call to a login endpoint based on config', function() {
      const store = mockStore({
        config: {
          apiRoot: 'http://www.test.com'
        }
      });

      const api = nock('http://www.test.com')
        .post(/login/)
        .reply(200, { userName: 'mitch' });

      return store
        .dispatch(
          userModule.login({
            userName: 'mitch',
            password: '123'
          })
        )
        .then(() => api.done());
    });

    it('contains the user object in the payload of its success action', function() {
      const store = mockStore({
        config: {
          apiRoot: 'http://www.test.com'
        }
      });

      const api = nock('http://www.test.com')
        .post(/login/)
        .reply(200, { userName: 'mitch' });

      return store
        .dispatch(
          userModule.login({
            userName: 'mitch',
            password: '123'
          })
        )
        .then(() => {
          const hasFailureAction = store
            .getActions()
            .some(
              a =>
                a.type === userModule.LOGIN_SUCCESS &&
                a.payload.userName === 'mitch'
            );

          return expect(hasFailureAction).to.be.true;
        })
        .then(() => api.done());
    });
  });

  describe('fetchUser', function() {
    it('exists', function() {
      expect(userModule.fetchUser).to.be.a('function');
    });

    it('makes an API call to a user endpoint based on config', function() {
      const store = mockStore({
        config: {
          apiRoot: 'http://www.test.com'
        }
      });

      const api = nock('http://www.test.com').get(/user/).reply(200);

      return store.dispatch(userModule.fetchUser()).then(() => api.done());
    });
  });
});
