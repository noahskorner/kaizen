import { GetWalletByUserIdRequest } from '@kaizen/wallet';
import {
  loadWalletAction,
  loadWalletFailureAction,
  loadWalletSuccessAction
} from './wallet.actions';
import { WalletClient } from './wallet.client';
import { WalletDispatch } from './wallet.store';

export const loadWallet = (request: GetWalletByUserIdRequest) => {
  return async (dispatch: WalletDispatch) => {
    dispatch(loadWalletAction());

    const response = await WalletClient.getByUserId(request);
    if (response.type === 'FAILURE')
      return dispatch(loadWalletFailureAction(response.errors));

    return dispatch(loadWalletSuccessAction(response.data));
  };
};
