import { AccountRecord } from '../account-record';
import { FindAccountsByExternalIdsQuery } from './find-accounts-by-external-ids.query';
import { FindAccountsByUserIdQuery } from './find-accounts-by-user-id.query';

export interface IFindAccountsRepository {
  findByUserId(query: FindAccountsByUserIdQuery): Promise<AccountRecord[]>;
  findByExternalId(
    query: FindAccountsByExternalIdsQuery
  ): Promise<AccountRecord[]>;
}
