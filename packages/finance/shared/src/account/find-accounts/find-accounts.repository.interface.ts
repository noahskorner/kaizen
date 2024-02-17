import { AccountRecord } from '../account-record';
import { FindAccountsByExternalIdsQuery } from './find-accounts-by-external-ids.query';

export interface IFindAccountsRepostiory {
  findByExternalId(
    query: FindAccountsByExternalIdsQuery
  ): Promise<AccountRecord[]>;
}
