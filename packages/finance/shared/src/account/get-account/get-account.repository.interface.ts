import { AccountRecord } from '../account-record';
import { GetAccountByExternalIdQuery } from './get-account-by-external-id.query';
import { GetAccountByIdQuery } from './get-account-by-id.query';

export interface IGetAccountRepository {
  getById(query: GetAccountByIdQuery): Promise<AccountRecord | null>;
  getByExternalId(
    query: GetAccountByExternalIdQuery
  ): Promise<AccountRecord | null>;
}
