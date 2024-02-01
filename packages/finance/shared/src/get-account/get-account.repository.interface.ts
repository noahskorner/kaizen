import { AccountRecord } from '../account-record';
import { GetAccountByExternalIdQuery } from './get-account-by-external-id.query';

export interface IGetAccountRepository {
  getByExternalId(
    query: GetAccountByExternalIdQuery
  ): Promise<AccountRecord | null>;
}
