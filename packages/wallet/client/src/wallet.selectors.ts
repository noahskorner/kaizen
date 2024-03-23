import { Wallet } from '@kaizen/wallet';
import { WalletStore } from '.';

export const selectWallet = (store: { wallet: WalletStore }): Wallet | null => {
  return store.wallet.wallet;
};
