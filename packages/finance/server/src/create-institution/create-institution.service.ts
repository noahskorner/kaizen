import {
  CreateInstitutionCommand,
  CreateInstitutionQuery,
  ICreateInstitutionRepository,
  ICreateInstitutionService,
  IFinancialProvider,
  ISyncAccountsService,
  Institution,
  InstitutionRecord,
  SyncAccountsCommand
} from '@kaizen/finance';
import { ApiResponse, Errors } from '@kaizen/core';
import { Service } from '@kaizen/core-server';

export class CreateInstitutionService
  extends Service
  implements ICreateInstitutionService
{
  constructor(
    private readonly _createInstitutionRepository: ICreateInstitutionRepository,
    private readonly _financialProvider: IFinancialProvider,
    private readonly _syncAccountsService: ISyncAccountsService
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
      // Create the institution
      const createInstitutionResponse = await this._create(command);
      if (createInstitutionResponse.type == 'FAILURE') {
        return this.failures(createInstitutionResponse.errors);
      }

      // Sync it's accounts
      const syncAccountsCommand: SyncAccountsCommand = {
        userId: command.userId,
        institutionIds: [createInstitutionResponse.data.id]
      };
      const syncAccountsResponse =
        await this._syncAccountsService.sync(syncAccountsCommand);
      if (syncAccountsResponse.type === 'FAILURE') {
        return this.failures(syncAccountsResponse.errors);
      }

      // Return the institution and it's accounts
      const institution: Institution = {
        id: createInstitutionResponse.data.id,
        userId: createInstitutionResponse.data.userId,
        accounts: syncAccountsResponse.data
      };
      return this.success(institution);
    } catch (error) {
      console.log(error);
      return this.failure(Errors.INTERNAL_SERVER_ERROR);
    }
  }

  private async _create(
    command: CreateInstitutionCommand
  ): Promise<ApiResponse<InstitutionRecord>> {
    const exchangeExternalPublicTokenResponse =
      await this._financialProvider.exchangeExternalPublicToken(
        command.publicToken
      );
    if (exchangeExternalPublicTokenResponse.type == 'FAILURE') {
      return this.failures(exchangeExternalPublicTokenResponse.errors);
    }

    const createInstitutionQuery: CreateInstitutionQuery = {
      userId: command.userId,
      plaidAccessToken: exchangeExternalPublicTokenResponse.data
    };
    const institutionRecord = await this._createInstitutionRepository.create(
      createInstitutionQuery
    );

    return this.success(institutionRecord);
  }
}
