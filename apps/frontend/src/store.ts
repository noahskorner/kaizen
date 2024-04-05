import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loadWallet, walletReducers } from '@kaizen/wallet-client';
import {
  LOGIN_SUCCESS,
  LoginSuccessAction,
  REFRESH_TOKEN_SUCCESS,
  RefreshTokenSuccessAction,
  authReducers
} from '@kaizen/auth-client';
import createSagaMiddleware from 'redux-saga';
import { call, fork, put, race, take } from 'redux-saga/effects';
import { GetWalletByUserIdRequest } from '@kaizen/wallet';

const rootReducer = combineReducers({
  wallet: walletReducers,
  auth: authReducers
});

const middleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([middleware])
});

function* onRefreshTokenLoadWallet(
  action: RefreshTokenSuccessAction | LoginSuccessAction
) {
  const request: GetWalletByUserIdRequest = { userId: action.payload.id };
  yield put(loadWallet(request));
}

function* saga() {
  yield fork(function* () {
    const result: {
      refreshTokenSuccess?: RefreshTokenSuccessAction;
      loginSuccess?: LoginSuccessAction;
    } = yield race({
      refreshTokenSuccess: take(REFRESH_TOKEN_SUCCESS),
      loginSuccess: take(LOGIN_SUCCESS)
    });

    const action = result.refreshTokenSuccess || result.loginSuccess;
    yield call(onRefreshTokenLoadWallet, action!);
  });
}

middleware.run(saga);
