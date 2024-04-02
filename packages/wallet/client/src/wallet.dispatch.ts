import { ThunkDispatch } from '@reduxjs/toolkit';
import { WalletState } from './wallet.state';
import { WalletAction } from './wallet.actions';

export type WalletDispatch = ThunkDispatch<WalletState, unknown, WalletAction>;
