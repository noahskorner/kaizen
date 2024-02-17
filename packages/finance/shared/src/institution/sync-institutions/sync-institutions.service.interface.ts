import { ServiceResponse } from '@kaizen/core';
import { SyncInstitutionsCommand } from './sync-institutions.command';
import { SyncInstitutionsResponse } from './sync-institutions.response';

export interface ISyncInstitutionsService {
  sync(
    command: SyncInstitutionsCommand
  ): Promise<ServiceResponse<SyncInstitutionsResponse>>;
}
