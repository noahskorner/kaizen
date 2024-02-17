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
import { ServiceResponse, ErrorCode } from '@kaizen/core';
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
  ): Promise<ServiceResponse<Institution>> {
    if (command.publicToken == null || command.publicToken === '') {
      return this.failure({
        code: ErrorCode.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN,
        params: {
          plaidPublicToken: command.publicToken
        }
      });
    }

    // Create the institution
    const createInstitutionResponse = await this._create(command);
    if (createInstitutionResponse.type == 'FAILURE') {
      return createInstitutionResponse;
    }
    const institutionRecord = createInstitutionResponse.data;

    // Sync it's accounts
    const syncAccountsCommand: SyncAccountsCommand = {
      userId: institutionRecord.userId,
      institutionIds: [institutionRecord.id]
    };
    const syncAccountsResponse =
      await this._syncAccountsService.sync(syncAccountsCommand);
    if (syncAccountsResponse.type === 'FAILURE') {
      return syncAccountsResponse;
    }

    // Return the institution and it's accounts
    const institution = syncAccountsResponse.data.succeeded.find(
      (institution) => institution.id === institutionRecord.id
    );
    if (institution == null) {
      return this.failure({
        code: ErrorCode.CREATE_INSTITUTION_FAILED_TO_SYNC_ACCOUNTS
      });
    }
    return this.success(institution);
  }

  private async _create(
    command: CreateInstitutionCommand
  ): Promise<ServiceResponse<InstitutionRecord>> {
    const response = await this._financialProvider.exchangeExternalPublicToken(
      command.publicToken
    );
    if (response.type == 'FAILURE') {
      return response;
    }

    const query: CreateInstitutionQuery = {
      userId: command.userId,
      plaidAccessToken: response.data
    };
    const institutionRecord =
      await this._createInstitutionRepository.create(query);

    return this.success(institutionRecord);
  }
}
