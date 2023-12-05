import { Institution } from '@kaizen/institution';
import { ApiResponse, Service } from '@kaizen/core';
import { FindInstitutionsCommand } from './find-institutions.command';
import { InstitutionRepository } from '@kaizen/data';
import { GetInstitutionService } from './get-institution.service';

export class FindInstitutionsService extends Service {
  constructor(
    private readonly institutionRepository: InstitutionRepository,
    private readonly getInstitutionService: GetInstitutionService
  ) {
    super();
  }

  public async find(
    command: FindInstitutionsCommand
  ): Promise<ApiResponse<Institution[]>> {
    const institutionRecords =
      await this.institutionRepository.findAll(command);

    const responses = await Promise.all(
      institutionRecords.map((institutionRecord) => {
        return this.getInstitutionService.get({
          id: institutionRecord.id
        });
      })
    );
    const errors = this.getFailures(responses);
    if (errors.length > 0) {
      return this.failures(errors);
    }

    const institutions = this.getSuccesses(responses);
    return this.success(institutions);
  }
}
