import { WalletRecord } from '../wallet-record';
import { CreateWalletQuery } from './create-wallet.query';

export interface ICreateWalletRepository {
  create(query: CreateWalletQuery): Promise<WalletRecord>;
}
