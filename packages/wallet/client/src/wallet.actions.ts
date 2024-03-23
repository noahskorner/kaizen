import { Wallet } from '@kaizen/wallet';

export const LOAD_WALLET = 'LOAD_WALLET';
export interface LoadWalletAction {
  type: typeof LOAD_WALLET;
}
export const loadWallet = (): LoadWalletAction => {
  return {
    type: LOAD_WALLET
  };
};

export const LOAD_WALLET_SUCCESS = 'LOAD_WALLET_SUCCESS';
export interface LoadWalletSuccessAction {
  type: typeof LOAD_WALLET_SUCCESS;
  payload: Wallet;
}
export const loadWalletSuccess = (wallet: Wallet): LoadWalletSuccessAction => {
  return {
    type: LOAD_WALLET_SUCCESS,
    payload: wallet
  };
};

export const LOAD_WALLET_FAILURE = 'LOAD_WALLET_FAILURE';
export interface LoadWalletFailureAction {
  type: typeof LOAD_WALLET_FAILURE;
}
export const loadWalletFailure = (): LoadWalletFailureAction => {
  return {
    type: LOAD_WALLET_FAILURE
  };
};

export type WalletAction =
  | LoadWalletAction
  | LoadWalletSuccessAction
  | LoadWalletFailureAction;
