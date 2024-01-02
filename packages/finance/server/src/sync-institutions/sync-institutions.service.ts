import { ApiResponse } from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  ISyncInstitutionsService,
  Institution,
  SyncInstitutionsCommand
} from '@kaizen/finance';

export class SyncInstitutionsService
  extends Service
  implements ISyncInstitutionsService
{
  public async sync(
    command: SyncInstitutionsCommand
  ): Promise<ApiResponse<Institution[]>> {
    return this.success([]);
  }
}
