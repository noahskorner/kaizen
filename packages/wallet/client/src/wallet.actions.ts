import { ApiError } from '@kaizen/core';
import { Wallet } from '@kaizen/wallet';

export const LOAD_WALLET = 'LOAD_WALLET';
export interface LoadWalletAction {
  type: typeof LOAD_WALLET;
}
export const loadWalletAction = (): LoadWalletAction => {
  return {
    type: LOAD_WALLET
  };
};

export const LOAD_WALLET_SUCCESS = 'LOAD_WALLET_SUCCESS';
export interface LoadWalletSuccessAction {
  type: typeof LOAD_WALLET_SUCCESS;
  payload: Wallet;
}
export const loadWalletSuccessAction = (
  wallet: Wallet
): LoadWalletSuccessAction => {
  return {
    type: LOAD_WALLET_SUCCESS,
    payload: wallet
  };
};

export const LOAD_WALLET_FAILURE = 'LOAD_WALLET_FAILURE';
export interface LoadWalletFailureAction {
  type: typeof LOAD_WALLET_FAILURE;
  payload: Array<ApiError>;
}
export const loadWalletFailureAction = (
  errors: Array<ApiError>
): LoadWalletFailureAction => {
  return {
    type: LOAD_WALLET_FAILURE,
    payload: errors
  };
};

export type WalletAction =
  | LoadWalletAction
  | LoadWalletSuccessAction
  | LoadWalletFailureAction;
