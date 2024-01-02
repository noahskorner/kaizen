import { ApiResponse } from '@kaizen/core';
import { Institution } from '../institution';
import { SyncInstitutionsCommand } from './sync-institutions.command';

export interface ISyncInstitutionsService {
  sync(command: SyncInstitutionsCommand): Promise<ApiResponse<Institution[]>>;
}
