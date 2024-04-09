import { ServiceResponse } from '@kaizen/core';
import {
  IServiceEventBus,
  Service,
  ServiceEventType,
  SyncAccountsSuccessEvent
} from '@kaizen/core-server';
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
  constructor(
    private readonly _syncAccountsService: ISyncAccountsService,
    private readonly _serviceEventBus: IServiceEventBus
  ) {
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

    const event: SyncAccountsSuccessEvent = {
      type: ServiceEventType.SYNC_ACCOUNTS_SUCCESS,
      payload: {
        userId: command.userId
      }
    };
    this._serviceEventBus.publish(event);
    return this.success(accountSyncResponse.data);
  }
}
