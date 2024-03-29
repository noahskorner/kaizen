import { ServiceResponse } from '@kaizen/core';
import { SyncAccountsCommand } from './sync-accounts.command';
import { SyncAccountsResponse } from './sync-accounts.response';

export interface ISyncAccountsService {
  sync(
    command: SyncAccountsCommand
  ): Promise<ServiceResponse<SyncAccountsResponse>>;
}
