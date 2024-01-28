import { ApiResponse } from '@kaizen/core';
import { SyncAccountsCommand } from './sync-accounts.command';
import { Account } from '../account';

export interface ISyncAccountsService {
  sync(command: SyncAccountsCommand): Promise<ApiResponse<Account[]>>;
}
