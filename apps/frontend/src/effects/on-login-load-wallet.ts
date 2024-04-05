import {
  RefreshTokenSuccessAction,
  LoginSuccessAction,
  REFRESH_TOKEN_SUCCESS,
  LOGIN_SUCCESS
} from '@kaizen/auth-client';
import { GetWalletByUserIdRequest } from '@kaizen/wallet';
import { loadWallet } from '@kaizen/wallet-client';
import { fork, put, race, take } from 'redux-saga/effects';

export function* onLoginLoadWallet() {
  yield fork(function* () {
    const result: {
      refreshTokenSuccess?: RefreshTokenSuccessAction;
      loginSuccess?: LoginSuccessAction;
    } = yield race({
      refreshTokenSuccess: take(REFRESH_TOKEN_SUCCESS),
      loginSuccess: take(LOGIN_SUCCESS)
    });

    const action = result.refreshTokenSuccess || result.loginSuccess;
    const request: GetWalletByUserIdRequest = { userId: action!.payload.id };
    yield put(loadWallet(request));
  });
}
