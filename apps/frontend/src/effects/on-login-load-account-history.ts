import { REFRESH_TOKEN_SUCCESS, LOGIN_SUCCESS } from '@kaizen/auth-client';
import { loadAccountHistory } from '@kaizen/finance-client';
import { fork, put, race, take } from 'redux-saga/effects';

export function* onLoginLoadAccountHistory() {
  yield fork(function* () {
    yield race({
      refreshTokenSuccess: take(REFRESH_TOKEN_SUCCESS),
      loginSuccess: take(LOGIN_SUCCESS)
    });
    yield put(loadAccountHistory());
  });
}
