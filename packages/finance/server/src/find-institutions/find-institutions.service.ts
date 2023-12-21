import { Institution } from '@kaizen/finance';
import { ApiResponse, Service } from '@kaizen/core';
import { FindInstitutionsCommand } from './find-institutions.command';
import { InstitutionAdapter } from '../institution.adapter';
import { FindInstitutionsRepository } from './find-institutions.repository';

export class FindInstitutionsService extends Service {
  constructor(
    private readonly _findInstitutionsRepository: FindInstitutionsRepository
  ) {
    super();
  }

  public async find(
    command: FindInstitutionsCommand
  ): Promise<ApiResponse<Institution[]>> {
    const institutionRecords =
      await this._findInstitutionsRepository.findAll(command);

    const institutions: Institution[] = institutionRecords.map(
      InstitutionAdapter.toInstitution
    );
    return this.success(institutions);
  }
}
