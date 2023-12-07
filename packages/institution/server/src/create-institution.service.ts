import { CreateInstitutionCommand } from './create-institution.command';
import { Institution } from '@kaizen/institution';
import { ApiResponse, Errors, Service } from '@kaizen/core';
import { InstitutionRepository } from '@kaizen/data';
import { FinancialProvider } from '@kaizen/provider';
import { CreateInstitutionQuery } from '@kaizen/data';
import { AccountAdapter } from './account.adapter';

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

    try {
      const response = await this.buildCreateInstitutionQuery(command);
      if (response.type == 'FAILURE') {
        return this.failures(response.errors);
      }

      const institutionRecord = await this._institutionRepository.create(
        response.data
      );

      const institution: Institution = {
        id: institutionRecord.id,
        userId: institutionRecord.userId,
        accounts: institutionRecord.accounts.map(AccountAdapter.toAccount)
      };
      return this.success(institution);
    } catch (error) {
      console.log(error);
      return this.failure(Errors.INTERNAL_SERVER_ERROR);
    }
  }

  private async buildCreateInstitutionQuery(
    command: CreateInstitutionCommand
  ): Promise<ApiResponse<CreateInstitutionQuery>> {
    const exchangeExternalPublicTokenResponse =
      await this._financialProvider.exchangeExternalPublicToken(
        command.publicToken
      );
    if (exchangeExternalPublicTokenResponse.type == 'FAILURE') {
      return this.failures(exchangeExternalPublicTokenResponse.errors);
    }

    const externalAccountsResponse =
      await this._financialProvider.getExternalAccounts(
        exchangeExternalPublicTokenResponse.data
      );
    if (externalAccountsResponse.type == 'FAILURE') {
      return this.failures(externalAccountsResponse.errors);
    }

    const createAccountQueries = externalAccountsResponse.data.map(
      AccountAdapter.toCreateAccountQuery
    );
    const createInstitutionQuery: CreateInstitutionQuery = {
      userId: command.userId,
      plaidAccessToken: exchangeExternalPublicTokenResponse.data,
      accounts: createAccountQueries
    };
    return this.success(createInstitutionQuery);
  }
}
