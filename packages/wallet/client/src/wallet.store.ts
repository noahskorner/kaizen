import { Wallet } from '@kaizen/wallet';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { WalletAction } from './wallet.actions';

export interface WalletStore {
  loading: boolean;
  wallet: Wallet | null;
}

export type WalletState = {
  wallet: WalletStore;
};

export type WalletDispatch = ThunkDispatch<WalletState, unknown, WalletAction>;
