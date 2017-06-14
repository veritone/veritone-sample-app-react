import { expect } from 'chai';
import userReducer, * as userModule from './';

describe('user module reducer', function() {
  describe('user', function() {
    it('handles user fetch request errors', function() {
      const fetchUserequestErrorAction = {
        type: userModule.FETCH_USER,
        error: true,
        payload: new Error()
      };

      const state = userReducer(undefined, fetchUserequestErrorAction);

      expect(state).to.have.property('fetchingFailed', true);
    });
  });

  describe('login', function() {
    it('handles request errors', function() {
      const loginRequestErrorAction = {
        type: userModule.LOGIN,
        error: true,
        payload: new Error()
      };

      const state = userReducer(undefined, loginRequestErrorAction);

      expect(state).to.have.property('loginFailed', true);
    });

    it('sets a good error message for server errors', function() {
      const loginRequestErrorAction = {
        type: userModule.LOGIN_FAILURE,
        payload: {
          status: 500
        }
      };

      const state = userReducer(undefined, loginRequestErrorAction);

      expect(state).to.have.property('loginFailureMessage').match(/try again/);
    });

    it('sets a good error message for bad credentials', function() {
      const loginRequestErrorAction = {
        type: userModule.LOGIN_FAILURE,
        payload: {
          name: 'ApiError',
          status: 404
        }
      };

      const state = userReducer(undefined, loginRequestErrorAction);

      expect(state).to.have.property('loginFailureMessage').match(/password/);
    });
  });
});
