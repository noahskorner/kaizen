import { GetWalletByUserIdRequest } from '@kaizen/wallet';
import { WalletDispatch } from './wallet.dispatch';
import {
  loadWalletAction,
  loadWalletFailureAction,
  loadWalletSuccessAction
} from './wallet.actions';
import { WalletClient } from './wallet.client';

export const loadWallet = (request: GetWalletByUserIdRequest) => {
  return async (dispatch: WalletDispatch) => {
    dispatch(loadWalletAction());

    const response = await WalletClient.getByUserId(request);
    if (response.type === 'FAILURE')
      return dispatch(loadWalletFailureAction(response.errors));

    return dispatch(loadWalletSuccessAction(response.data));
  };
};
