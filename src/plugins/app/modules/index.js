import { createReducer } from 'helpers/redux';

export const namespace = 'App';

const defaultState = {};

const reducer = createReducer(defaultState, {});

export default reducer;

// function local(state) {
//   return state[namespace];
// }
