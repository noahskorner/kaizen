import { WalletRecord } from '../wallet-record';
import { GetWalletByUserIdQuery } from './get-wallet-by-user-id.query';

export interface IGetWalletRepository {
  getByUserId(query: GetWalletByUserIdQuery): Promise<WalletRecord | null>;
}
