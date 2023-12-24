import { FindVirtualAccountsQuery } from './find-virtual-accounts.query';
import { VirtualAccountRecord } from '../virtual-account-record';

export interface IFindVirtualAccountsRepository {
  find(command: FindVirtualAccountsQuery): Promise<VirtualAccountRecord[]>;
}
