export const namespace = 'user';

const defaultState = {
  user: {},

  isFetching: false,
  fetchingFailed: false,

  isLoggingIn: false,
  loginFailed: false,
  loginFailureMessage: null,

  isFetchingApplications: false,
  fetchApplicationsFailed: false,
  fetchApplicationsFailureMessage: null,
  enabledApps: []
};

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

export function reduceReducers(...reducers) {
  return (state, action) => {
    let isInitial = !state;
    return reducers.reduce(
      (newState, reducer) => {
        if (isInitial) {
          return { ...newState, ...reducer(undefined, action) };
        } else {
          return reducer(newState, action);
        }
      },
      { ...state }
    );
  };
}

export const User = {
  isLoggedIn: false,
  username: 'xchristensen'
};

function local(state) {
  return state[namespace];
}

export function isLoggingIn(state) {
  return local(state).isLoggingIn;
}

export function loginFailed(state) {
  return local(state).loginFailed;
}

export function loginFailureMessage(state) {
  return local(state).loginFailureMessage;
}
