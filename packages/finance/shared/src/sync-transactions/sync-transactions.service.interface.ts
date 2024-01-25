import { ApiResponse } from '@kaizen/core';
import { SyncAllTransactionsCommand } from './sync-all-transactions.command';
import { SyncTransactionsResponse } from './sync-transactions.response';
import { SyncTransactionsCommand } from './sync-transactions.command';

export interface ISyncTransactionsService {
  sync(
    command: SyncTransactionsCommand
  ): Promise<ApiResponse<SyncTransactionsResponse>>;
  syncAll(
    command: SyncAllTransactionsCommand
  ): Promise<Array<ApiResponse<SyncTransactionsResponse>>>;
}
