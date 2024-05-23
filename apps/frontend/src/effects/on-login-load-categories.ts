import { REFRESH_TOKEN_SUCCESS, LOGIN_SUCCESS } from '@kaizen/auth-client';
import { LOAD_CATEGORIES } from '@kaizen/finance-client';
import { fork, put, race, take } from 'redux-saga/effects';

export function* onLoginLoadCategories() {
  yield fork(function* () {
    yield race({
      refreshTokenSuccess: take(REFRESH_TOKEN_SUCCESS),
      loginSuccess: take(LOGIN_SUCCESS)
    });
    yield put({ type: LOAD_CATEGORIES });
  });
}
