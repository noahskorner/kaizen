import { Institution } from '@kaizen/finance';
import { ApiResponse } from '@kaizen/core';
import { FindInstitutionsCommand } from './find-institutions.command';
import { InstitutionRepository } from '@kaizen/data';
import { InstitutionAdapter } from './institution.adapter';
import { Service } from '@kaizen/core-server';

export class FindInstitutionsService extends Service {
  constructor(private readonly institutionRepository: InstitutionRepository) {
    super();
  }

  public async find(
    command: FindInstitutionsCommand
  ): Promise<ApiResponse<Institution[]>> {
    const institutionRecords =
      await this.institutionRepository.findAll(command);

    const institutions: Institution[] = institutionRecords.map(
      InstitutionAdapter.toInstitution
    );
    return this.success(institutions);
  }
}
