import { SyncTransactionRecordsResponse } from './sync-transacation-records-response';
import { SyncTransactionsQuery } from './sync-transactions.query';

export interface ISyncTransactionsRepository {
  sync(query: SyncTransactionsQuery): Promise<SyncTransactionRecordsResponse>;
}
