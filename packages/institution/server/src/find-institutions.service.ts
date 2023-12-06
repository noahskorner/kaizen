import { Institution } from '@kaizen/institution';
import { ApiResponse, Service } from '@kaizen/core';
import { FindInstitutionsCommand } from './find-institutions.command';
import { InstitutionRepository } from '@kaizen/data';

export class FindInstitutionsService extends Service {
  constructor(private readonly institutionRepository: InstitutionRepository) {
    super();
  }

  public async find(
    command: FindInstitutionsCommand
  ): Promise<ApiResponse<Institution[]>> {
    const institutionRecords =
      await this.institutionRepository.findAll(command);

    const institutions = institutionRecords.map((institutionRecord) => {
      const institution: Institution = {
        id: institutionRecord.id,
        userId: institutionRecord.userId
      };

      return institution;
    });

    return this.success(institutions);
  }
}
