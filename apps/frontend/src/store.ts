import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { walletReducers } from '@kaizen/wallet-client';

const reducer = combineReducers({
  wallet: walletReducers
});

export const store = configureStore({ reducer: reducer });
