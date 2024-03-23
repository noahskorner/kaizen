import { Wallet } from '@kaizen/wallet';

export interface WalletStore {
  loading: boolean;
  wallet: Wallet | null;
}
