import { createReducer } from 'helpers/redux';
import { isEmpty } from 'helpers';
import gql from 'graphql-tag'

export const namespace = 'user';

export const FETCH_USER = 'vtn/user/FETCH_USER';
export const FETCH_USER_GQL = 'vtn/user/FETCH_USER_GQL';
export const FETCH_USER_SUCCESS = 'vtn/user/FETCH_USER_SUCCESS';
export const FETCH_USER_SUCCESS_GQL = 'vtn/user/FETCH_USER_SUCCESS_GQL';
export const FETCH_USER_FAILURE = 'vtn/user/FETCH_USER_FAILURE_GQL';
export const FETCH_USER_FAILURE_GQL = 'vtn/user/FETCH_USER_FAILURE';

export const FETCH_USER_APPLICATIONS = 'vtn/user/FETCH_USER_APPLICATIONS';
export const FETCH_USER_APPLICATIONS_SUCCESS =
  'vtn/user/FETCH_USER_APPLICATIONS_SUCCESS';
export const FETCH_USER_APPLICATIONS_FAILURE =
  'vtn/user/FETCH_USER_APPLICATIONS_FAILURE';

const defaultState = {
  user: {},
  applications: {},

  isFetching: false,
  fetchingFailed: false,

  isFetchingApplications: false,
  fetchApplicationsFailed: false,
  fetchApplicationsFailureMessage: null,
  enabledApps: []
};

const reducer = createReducer(defaultState, {
  [FETCH_USER](state, action) {
    return {
      ...state,
      isFetching: true,
      fetchingFailed: false
    };
  },
  [FETCH_USER_GQL](state, action) {
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
  [FETCH_USER_SUCCESS_GQL](state, action) {
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
    const requestSuccessState = {
      ...state,
      isFetchingApplications: true,
      fetchApplicationsFailed: false,
      fetchApplicationsFailureMessage: null,
      enabledApps: []
    };

    return action.error
      ? this[FETCH_USER_APPLICATIONS_FAILURE](state, action)
      : requestSuccessState;
  },

  [FETCH_USER_APPLICATIONS_SUCCESS](state, action) {
    return {
      ...state,
      isFetchingApplications: false,
      fetchApplicationsFailed: false,
      enabledApps: action.payload.records,
      fetchApplicationsFailureMessage: null
    };
  },

  [FETCH_USER_APPLICATIONS_FAILURE](state, action) {
    const statusErrors = {
      404: "Couldn't get application list.",
      default: "Couldn't get application list. Please login."
    };

    const failureMessage =
      action.payload.name === 'ApiError'
        ? statusErrors[action.payload.status] || statusErrors.default
        : action.payload.name === 'RequestError'
          ? 'There was an error when fetching application list, please try again.'
          : statusErrors.default;

    return {
      ...state,
      isFetchingApplications: false,
      fetchApplicationsFailed: true,
      fetchApplicationsFailureMessage: failureMessage,
      enabledApps: []
    };
  }
});

export default reducer;

function local(state) {
  return state[namespace];
}

export function fetchUser() {
  return (dispatch, getState, gqlClient) => {
    dispatch({ type: FETCH_USER })
    gqlClient.query({query: gql`{ me { id name } }`}).then(
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

export function fetchEnabledApps() {
  return (dispatch, getState, gqlClient) => {
    dispatch({ type: FETCH_USER_APPLICATIONS })
    gqlClient.query({query: gql`{
      applications {
       records {
         applicationId: id
         applicationName: name
         applicationIconUrl: iconUrl
         applicationIconSvg: iconSvg
       }
     }
    }`}).then(
      (res) => {
        dispatch({
        type: FETCH_USER_APPLICATIONS_SUCCESS,
        payload: res.data.applications
      })
    },
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

export function getEnabledApps(state) {
  return local(state).enabledApps;
}