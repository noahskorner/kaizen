import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { walletReducers } from '@kaizen/wallet-client';
import { authReducers } from '@kaizen/auth-client';
import {
  institutionReducers,
  transactionReducers
} from '@kaizen/finance-client';
import { toastReducers } from '@kaizen/core-client';
import { effects } from './effects/effects';
import { onLoginFailureDisplayToast } from './effects/on-login-failure-display-toast';
import { onLoginLoadInstitutions } from './effects/on-login-load-institutions';
import { onLoginLoadWallet } from './effects/on-login-load-wallet';
import { onLoginLoadTransactions } from './effects';

const rootReducer = combineReducers({
  wallet: walletReducers,
  auth: authReducers,
  institution: institutionReducers,
  toast: toastReducers,
  transaction: transactionReducers
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([effects])
});

effects.run(onLoginFailureDisplayToast);
effects.run(onLoginLoadWallet);
effects.run(onLoginLoadInstitutions);
effects.run(onLoginLoadTransactions);
