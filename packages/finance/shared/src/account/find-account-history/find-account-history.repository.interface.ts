import { Paginated } from '@kaizen/core';
import { AccountSnapshotRecord } from '../snapshot-accounts';
import { FindAccountHistoryQuery } from './find-account-history.query';

export interface IFindAccountHistoryRepository {
  find(
    query: FindAccountHistoryQuery
  ): Promise<Paginated<AccountSnapshotRecord>>;
}
