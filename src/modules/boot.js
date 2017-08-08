import { createReducer } from 'helpers/redux';
import { batchActions } from 'redux-batch-enhancer';

import { setConfig } from 'modules/config';

export const namespace = 'boot';

export const BOOT_START = 'vtn/boot/BOOT_START';
export const BOOT_END = 'vtn/boot/BOOT_END';
export const BOOT_FAILURE = 'vtn/boot/BOOT_FAILURE';

const defaultState = {
  isBooting: false,
  booted: false,
  failedBooting: false
};

const reducer = createReducer(defaultState, {
  [BOOT_START](state, action) {
    return {
      ...state,
      isBooting: true
    };
  },

  [BOOT_END](state, action) {
    return {
      ...state,
      isBooting: false,
      booted: true
    };
  },

  [BOOT_FAILURE](state, action) {
    return {
      ...state,
      isBooting: false,
      failedBooting: true,
      failedBootingReason: action.payload.message
    };
  }
});

export default reducer;

// function local(state) {
//   return state[namespace];
// }

export function boot() {
  return (dispatch, getState) => {
    if (!window.config) {
      // eslint-disable-line no-undef
      console.warn(
        'WARNING: No config global found. This should have been injected by ' +
          'the build/server!'
      );
    }

    dispatch(
      batchActions([
        { type: BOOT_START },
        // config provided by webpack globals in dev,
        // and a <script> in index.html in prod. (todo)
        // put it into the store here so we don't have to refer to the global.
        setConfig(window.config) // eslint-disable-line no-undef
      ])
    );

    dispatch({ type: BOOT_END });
  };
}
