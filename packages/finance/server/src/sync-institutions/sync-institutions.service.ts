import { ServiceResponse } from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  ISyncAccountsService,
  ISyncInstitutionsService,
  SyncAccountsCommand,
  SyncInstitutionsCommand,
  SyncInstitutionsResponse
} from '@kaizen/finance';

export class SyncInstitutionsService
  extends Service
  implements ISyncInstitutionsService
{
  constructor(private readonly _syncAccountsService: ISyncAccountsService) {
    super();
  }

  public async sync(
    command: SyncInstitutionsCommand
  ): Promise<ServiceResponse<SyncInstitutionsResponse>> {
    const accountSyncCommand: SyncAccountsCommand = {
      userId: command.userId
    };
    const accountSyncResponse =
      await this._syncAccountsService.sync(accountSyncCommand);

    if (accountSyncResponse.type === 'FAILURE') {
      return accountSyncResponse;
    }

    return this.success(accountSyncResponse.data);
  }
}
