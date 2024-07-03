import { Paginated } from '@kaizen/core';
import { FindAccountHistoryQuery } from './find-account-history.query';
import { AccountHistoryRecord } from '../account-history-record';

export interface IFindAccountHistoryRepository {
  find(
    query: FindAccountHistoryQuery
  ): Promise<Paginated<AccountHistoryRecord>>;
}
