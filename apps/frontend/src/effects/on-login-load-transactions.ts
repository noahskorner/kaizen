import { REFRESH_TOKEN_SUCCESS, LOGIN_SUCCESS } from '@kaizen/auth-client';
import { FindTransactionsRequest } from '@kaizen/finance';
import { loadTransactions } from '@kaizen/finance-client';
import { fork, put, race, take } from 'redux-saga/effects';

export function* onLoginLoadTransactions() {
  yield fork(function* () {
    yield race({
      refreshTokenSuccess: take(REFRESH_TOKEN_SUCCESS),
      loginSuccess: take(LOGIN_SUCCESS)
    });

    const request: FindTransactionsRequest = {
      page: 1,
      pageSize: 100
    };
    yield put(loadTransactions(request));
  });
}
