import { VirtualAccountRecord } from '../virtual-account-record';
import { CreateVirtualAccountQuery } from './create-virtual-account.query';

export interface ICreateVirtualAccountRepository {
  create(query: CreateVirtualAccountQuery): Promise<VirtualAccountRecord>;
}
