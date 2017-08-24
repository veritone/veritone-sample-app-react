import { createReducer } from 'helpers/redux';
import { isEmpty } from 'helpers';

export const namespace = 'user';

export const FETCH_USER = 'vtn/user/FETCH_USER';
export const FETCH_USER_SUCCESS = 'vtn/user/FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'vtn/user/FETCH_USER_FAILURE';

export const FETCH_USER_APPLICATIONS = 'vtn/user/FETCH_USER_APPLICATIONS';
export const FETCH_USER_APPLICATIONS_SUCCESS = 'vtn/user/FETCH_USER_APPLICATIONS_SUCCESS';
export const FETCH_USER_APPLICATIONS_FAILURE = 'vtn/user/FETCH_USER_APPLICATIONS_FAILURE';

const defaultState = {
  user: {},
  applications: {},

  isFetching: false,
  fetchingFailed: false,
  
  isFetchingApplications: false,
  fetchingApplicationsFailed: false
};

const reducer = createReducer(defaultState, {
  [FETCH_USER](state, action) {
    return {
      ...state,
      isFetching: true,
      fetchingFailed: false
    };
  },
  [FETCH_USER_SUCCESS](state, action) {
    return {
      ...state,
      isFetching: false,
      fetchingFailed: false,
      user: action.payload
    };
  },
  [FETCH_USER_FAILURE](state, action) {
    return {
      ...state,
      isFetching: false,
      fetchingFailed: true,
      user: {}
    };
  },
  [FETCH_USER_APPLICATIONS](state, action) {
    return {
      ...state,
      isFetchingApplications: true,
      fetchingApplicationsFailed: false
    };
  },
  [FETCH_USER_APPLICATIONS_SUCCESS](state, action) {
    return {
      ...state,
      isFetchingApplications: false,
      fetchingApplicationsFailed: false,
      applications: action.payload
    };
  },
  [FETCH_USER_APPLICATIONS_FAILURE](state, action) {
    return {
      ...state,
      isFetchingApplications: false,
      fetchingApplicationsFailed: true,
      applications: {}
    };
  }
});

export default reducer;

function local(state) {
  return state[namespace];
}

export function fetchUser() {
  return (dispatch, getState, client) => {
    dispatch({ type: FETCH_USER })
    client.user.getCurrentUser().then(
      (user) => dispatch({
        type: FETCH_USER_SUCCESS,
        payload: user
      }),
      (err) => dispatch({
        type: FETCH_USER_FAILURE,
        error: true,
        payload: err
      })
    );
  }
}

export function fetchApplications() {
  return (dispatch, getState, client) => {
    dispatch({ type: FETCH_USER_APPLICATIONS })
    client.user.getApplications().then(
      (user) => dispatch({
        type: FETCH_USER_APPLICATIONS_SUCCESS,
        payload: user
      }),
      (err) => dispatch({
        type: FETCH_USER_APPLICATIONS_FAILURE,
        error: true,
        payload: err
      })
    );
  }
}

export function userIsAuthenticated(state) {
  return !isEmpty(local(state).user);
}
