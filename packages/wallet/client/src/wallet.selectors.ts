import { Wallet } from '@kaizen/wallet';
import { WalletState } from './wallet.store';

export const selectWallet = (state: WalletState): Wallet | null => {
  return state.wallet.wallet;
};
