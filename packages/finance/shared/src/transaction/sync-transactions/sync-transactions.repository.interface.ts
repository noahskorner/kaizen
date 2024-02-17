import { SyncTransactionsResult } from './sync-transacations.result';
import { SyncTransactionsQuery } from './sync-transactions.query';

export interface ISyncTransactionsRepository {
  sync(query: SyncTransactionsQuery): Promise<SyncTransactionsResult>;
}
