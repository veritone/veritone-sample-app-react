import { call, put, takeLatest, fork, select, all } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { isEmpty } from 'lodash';
import { LOCATION_CHANGE, replace } from 'react-router-redux';
import {
  permissions as perms,
  util as permissionUtil
} from 'functional-permissions-lib';

import {
  refreshApiToken,
  userIsAuthenticated,
  LOGOUT_SUCCESS,
  logout,
  selectUser,
  FETCH_USER_SUCCESS,
  LOGIN_SUCCESS,
  REFRESH_TOKEN_SUCCESS
} from 'modules/user';

export function* refreshToken() {
  const twoHours = 2 * 60 * 60 * 1000;

  try {
    const isAuthed = yield select(userIsAuthenticated);

    if (!isAuthed) {
      return;
    }

    yield put(refreshApiToken());
  } catch (error) {
    // cancellation error
  } finally {
    yield call(delay, twoHours);
  }
}

// Refresh api token immediately, and at an interval while app is active
function* watchPollRefreshApiToken() {
  yield call(delay, 20000); // wait a while for initial app load

  while (true) {
    yield call(refreshToken);
  }
}

export function* logoutIfUnauthorized(action) {
  if (action.error && action.payload && action.payload.status === 401) {
    if (yield select(userIsAuthenticated)) {
      yield put(logout());
    }
  }
}

function* watchedUnAuthorizedActions() {
  yield takeLatest('*', logoutIfUnauthorized);
}

// LOGOUT_SUCCESS action means the user's cookie has been invalidated. now
// refresh the page.
export function* handleLogout() {
  yield call([window.location, window.location.reload]);
}

function* watchLogout() {
  yield takeLatest(LOGOUT_SUCCESS, handleLogout);
}

const noAccessRedirect = '/no-access';
function* handleVerifyDeveloperAccess() {
  const user = yield select(selectUser);

  if (isEmpty(user)) {
    // not logged in or not yet fetched
    return;
  }

  if (
    !permissionUtil.hasAccessTo(perms.developer.access, user.permissionMasks)
  ) {
    yield put(replace(noAccessRedirect));
  }
}

function* watchDeveloperAccess() {
  yield takeLatest(
    [
      FETCH_USER_SUCCESS,
      LOGIN_SUCCESS,
      REFRESH_TOKEN_SUCCESS,
      action =>
        action.type === LOCATION_CHANGE &&
        action.payload.pathname !== noAccessRedirect
    ],
    action => handleVerifyDeveloperAccess(action.payload)
  );
}

export default function* root() {
  yield all([
    fork(watchPollRefreshApiToken),
    fork(watchLogout),
    fork(watchedUnAuthorizedActions),
    fork(watchDeveloperAccess)
  ]);
}
