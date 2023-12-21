import { Institution } from '@kaizen/finance';
import { ApiResponse } from '@kaizen/core';
import { FindInstitutionsCommand } from './find-institutions.command';
import { InstitutionAdapter } from '../institution.adapter';
import { FindInstitutionsRepository, Service } from '@kaizen/core-server';

export class FindInstitutionsService extends Service {
  constructor(
    private readonly _findInstitutionRepository: FindInstitutionsRepository
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
