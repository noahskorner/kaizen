import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { walletReducers } from '@kaizen/wallet-client';
import { authReducers } from '@kaizen/auth-client';
import {
  accountHistoryReducers,
  categoryReducers,
  exchangeRateReducers,
  institutionReducers,
  transactionReducers
} from '@kaizen/finance-client';
import { screenReducers, sidebarReducers } from '@kaizen/core-client';
import { effects } from './effects/effects';
import { onLoginLoadInstitutions } from './effects/on-login-load-institutions';
import { onLoginLoadWallet } from './effects/on-login-load-wallet';
import {
  onDesktopShowSidebar,
  onLoginLoadCategories,
  onLoginLoadExchangeRate,
  onLoginLoadTransactions
} from './effects';
import { onMobileHideSidebar } from './effects/on-mobile-hide-sidebar';
import { onLoginLoadAccountHistory } from './effects/on-login-load-account-history';

const rootReducer = combineReducers({
  screen: screenReducers,
  sidebar: sidebarReducers,
  wallet: walletReducers,
  auth: authReducers,
  institution: institutionReducers,
  transaction: transactionReducers,
  category: categoryReducers,
  accountHistory: accountHistoryReducers,
  exchangeRate: exchangeRateReducers
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([effects])
});

effects.run(onMobileHideSidebar);
effects.run(onDesktopShowSidebar);
effects.run(onLoginLoadExchangeRate);
effects.run(onLoginLoadInstitutions);
effects.run(onLoginLoadTransactions);
effects.run(onLoginLoadCategories);
effects.run(onLoginLoadAccountHistory);
effects.run(onLoginLoadWallet);
