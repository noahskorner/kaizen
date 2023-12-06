import { CreateInstitutionCommand } from './create-institution.command';
import { Institution } from '@kaizen/institution';
import { ApiResponse, Errors, Service } from '@kaizen/core';
import { InstitutionRepository } from '@kaizen/data';
import { FinancialProvider } from '@kaizen/provider';

export class CreateInstitutionService extends Service {
  constructor(
    private readonly _institutionRepository: InstitutionRepository,
    private readonly _financialProvider: FinancialProvider
  ) {
    super();
  }

  public async create(
    command: CreateInstitutionCommand
  ): Promise<ApiResponse<Institution>> {
    if (command.publicToken == null || command.publicToken === '') {
      return this.failure(Errors.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN);
    }

    // const user = await

    try {
      const response = await this._financialProvider.exchangePublicToken(
        command.publicToken
      );

      if (response.type == 'FAILURE') {
        return this.failures(response.errors);
      }

      const institutionRecord = await this._institutionRepository.create(
        command.userId,
        response.data
      );
      const institution: Institution = {
        id: institutionRecord.id,
        userId: institutionRecord.userId
      };
      return this.success(institution);
    } catch (error) {
      console.log(error);
      return this.failure(Errors.INTERNAL_SERVER_ERROR);
    }
  }
}
