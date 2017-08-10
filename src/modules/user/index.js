import { createReducer } from 'helpers/redux';
import { isEmpty } from 'helpers';

export const namespace = 'user';

export const FETCH_USER = 'vtn/user/FETCH_USER';
export const FETCH_USER_SUCCESS = 'vtn/user/FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'vtn/user/FETCH_USER_FAILURE';

const defaultState = {
  user: {},

  isFetching: false,
  fetchingFailed: false,
};

const reducer = createReducer(defaultState, {
  [FETCH_USER](state, action) {
    const requestSuccessState = {
      ...state,
      isFetching: true,
      fetchingFailed: false
    };

    return action.error
      ? // handle requestError ie. offline
        this[FETCH_USER_FAILURE](state, action)
      : requestSuccessState;
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
  }
});

export default reducer;

function local(state) {
  return state[namespace];
}

export function fetchUser() {
  return (dispatch, getState, client) => {
    dispatch({ type: FETCH_USER })

    client.engine.getEngines().then(
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

export function userIsAuthenticated(state) {
  return !isEmpty(local(state).user);
}
