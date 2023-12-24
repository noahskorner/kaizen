import {
  FindInstitutionsCommand,
  IFindInstitutionsRepository,
  IFindInstitutionsService,
  Institution
} from '@kaizen/finance';
import { ApiResponse } from '@kaizen/core';
import { InstitutionAdapter } from '../institution.adapter';
import { Service } from '@kaizen/core-server';

export class FindInstitutionsService
  extends Service
  implements IFindInstitutionsService
{
  constructor(
    private readonly _findInstitutionRepository: IFindInstitutionsRepository
  ) {
    super();
  }

  public async find(
    command: FindInstitutionsCommand
  ): Promise<ApiResponse<Institution[]>> {
    const institutionRecords =
      await this._findInstitutionRepository.find(command);

    const institutions: Institution[] = institutionRecords.map(
      InstitutionAdapter.toInstitution
    );
    return this.success(institutions);
  }
}
