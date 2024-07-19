import { AccountHistoryRecord } from '../account-history-record';
import { CreateAccountHistoryQuery } from './create-account-history.query';

export interface ICreateAccountHistoryRepository {
  bulkCreate(
    query: Array<CreateAccountHistoryQuery>
  ): Promise<Array<AccountHistoryRecord>>;
}
