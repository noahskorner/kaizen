import { AccountRecord } from '../account-record';
import { CreateAccountQuery } from './create-account.query';
import { UpdateAccountQuery } from './update-account.query';

export interface ISyncAccountsRepository {
  create(query: CreateAccountQuery): Promise<AccountRecord>;
  update(query: UpdateAccountQuery): Promise<AccountRecord>;
}
