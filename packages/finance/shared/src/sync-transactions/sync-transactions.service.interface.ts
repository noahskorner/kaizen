import { ApiResponse } from '@kaizen/core';
import { SyncTransactionsCommand } from './sync-transactions.command';
import { SyncTransactionsResponse } from './sync-transactions.response';

export interface ISyncTransactionsService {
  sync(
    command: SyncTransactionsCommand
  ): Promise<ApiResponse<SyncTransactionsResponse>>;
}
