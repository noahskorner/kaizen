import {
  LOAD_WALLET,
  LOAD_WALLET_FAILURE,
  LOAD_WALLET_SUCCESS,
  WalletAction
} from './wallet.actions';
import { WalletStore } from './wallet.store';

const initialState: WalletStore = {
  loading: false,
  wallet: null
};

export const walletReducers = (
  state = initialState,
  action: WalletAction
): WalletStore => {
  switch (action.type) {
    case LOAD_WALLET:
      return {
        loading: true,
        wallet: null
      };
    case LOAD_WALLET_SUCCESS:
      return {
        loading: false,
        wallet: action.payload
      };
    case LOAD_WALLET_FAILURE:
      return {
        loading: false,
        wallet: null
      };
    default:
      return state;
  }
};
