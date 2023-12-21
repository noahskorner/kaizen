import { CreateInstitutionCommand } from './create-institution.command';
import { Institution } from '@kaizen/finance';
import { ApiResponse, Errors, Service } from '@kaizen/core';
import { CreateAccountQuery, InstitutionRepository } from '@kaizen/data';
import { FinancialProvider } from '@kaizen/provider';
import { CreateInstitutionQuery } from '@kaizen/data';
import { AccountAdapter } from './account.adapter';
import { CreateTransactionQuery } from '@kaizen/data/src/create-transaction.query';
import { ExternalTransaction } from '@kaizen/provider/src/external-transaction';
import { TransactionAdapter } from './transaction.adapter';

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

    const createAccountResponse = await this.buildCreateAccountQueries(
      exchangeExternalPublicTokenResponse.data
    );
    if (createAccountResponse.type === 'FAILURE') {
      return this.failures(createAccountResponse.errors);
    }

    const createInstitutionQuery: CreateInstitutionQuery = {
      userId: command.userId,
      plaidAccessToken: exchangeExternalPublicTokenResponse.data,
      accounts: createAccountResponse.data
    };
    return this.success(createInstitutionQuery);
  }

  private async buildCreateAccountQueries(
    accessToken: string
  ): Promise<ApiResponse<CreateAccountQuery[]>> {
    const externalAccountsResponse =
      await this._financialProvider.getExternalAccounts(accessToken);
    if (externalAccountsResponse.type == 'FAILURE') {
      return this.failures(externalAccountsResponse.errors);
    }

    const syncExternalTransactionsResponse =
      await this._financialProvider.syncExternalTransactions(accessToken);
    if (syncExternalTransactionsResponse.type === 'FAILURE') {
      return this.failures(syncExternalTransactionsResponse.errors);
    }

    const createAccountQueries = await Promise.all(
      externalAccountsResponse.data.map(async (externalAccount) => {
        const createAccountQuery: CreateAccountQuery = {
          externalId: externalAccount.id,
          current: externalAccount.current,
          available: externalAccount.available,
          currency: externalAccount.currency,
          type: AccountAdapter.toAccountRecordType(externalAccount.type),
          transactions: this.getTransactionQueries(
            externalAccount.id,
            syncExternalTransactionsResponse.data.added // TODO: Change to use the plaidClient.transactionsGet API instead.
          )
        };

        return createAccountQuery;
      })
    );
    return this.success(createAccountQueries);
  }

  private getTransactionQueries(
    externalAccountId: string,
    externalTransactions: ExternalTransaction[]
  ): CreateTransactionQuery[] {
    return externalTransactions
      .filter(
        (externalTransaction) =>
          externalTransaction.accountId === externalAccountId
      )
      .map(TransactionAdapter.toCreateTransactionQuery);
  }
}
