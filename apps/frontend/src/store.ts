import { Middleware, combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  WalletDispatch,
  loadWallet,
  walletReducers
} from '@kaizen/wallet-client';
import {
  AuthAction,
  REFRESH_TOKEN_SUCCESS,
  authReducers
} from '@kaizen/auth-client';
import { GetWalletByUserIdRequest } from '@kaizen/wallet';

const rootReducer = combineReducers({
  wallet: walletReducers,
  auth: authReducers
});

const effects =
  (store: { dispatch: WalletDispatch }) =>
  (next: (action: AuthAction) => unknown) =>
  (action: AuthAction) => {
    const result = next(action);

    if (action.type === REFRESH_TOKEN_SUCCESS) {
      const request: GetWalletByUserIdRequest = {
        userId: action.payload.id
      };
      store.dispatch(loadWallet(request));
    }

    return result;
  };

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(effects as Middleware)
});
