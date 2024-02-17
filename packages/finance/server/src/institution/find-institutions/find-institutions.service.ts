import {
  FindInstitutionsCommand,
  IFindInstitutionsRepository,
  IFindInstitutionsService,
  Institution,
  InstitutionAdapter
} from '@kaizen/finance';
import { ServiceResponse } from '@kaizen/core';
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
  ): Promise<ServiceResponse<Institution[]>> {
    const institutionRecords =
      await this._findInstitutionRepository.find(command);

    const institutions: Institution[] = institutionRecords.map(
      (institutionRecord) => InstitutionAdapter.toInstitution(institutionRecord)
    );
    return this.success(institutions);
  }
}
