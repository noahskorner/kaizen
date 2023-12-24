import { ApiResponse } from '@kaizen/core';
import { FindInstitutionsCommand } from './find-institutions.command';
import { Institution } from '../institution';

export interface IFindInstitutionsService {
  find(command: FindInstitutionsCommand): Promise<ApiResponse<Institution[]>>;
}
