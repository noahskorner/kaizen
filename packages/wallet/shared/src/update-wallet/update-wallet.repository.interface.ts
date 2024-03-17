import { ServiceResponse } from '@kaizen/core';
import { WalletRecord } from '../wallet-record';
import { UpdateWalletQuery } from './update-wallet.query';

export interface IUpdateWalletRepository {
  update(query: UpdateWalletQuery): Promise<ServiceResponse<WalletRecord>>;
}
