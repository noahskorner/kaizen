import { InstitutionRepository } from '@kaizen/data';
import { GetInstitutionCommand } from './get-institution.command';
import { ApiResponse, Errors, Service } from '@kaizen/core';
import { FinancialProvider } from '@kaizen/provider';
import { Account, Institution } from '@kaizen/institution';
import { AccountBase } from 'plaid';

export class GetInstitutionService extends Service {
  constructor(
    private readonly institutionRepository: InstitutionRepository,
    private readonly financialProvider: FinancialProvider
  ) {
    super();
    this.institutionRepository = institutionRepository;
  }

  public async get(
    command: GetInstitutionCommand
  ): Promise<ApiResponse<Institution>> {
    const institutionRecord = await this.institutionRepository.get(command.id);
    if (institutionRecord == null) {
      return this.failure(Errors.GET_INSTITUTION_INSTITUTION_NOT_FOUND);
    }

    const response = await this.financialProvider.getAccounts(
      institutionRecord.plaidAccessToken
    );
    if (response.type == 'FAILURE') {
      return this.failures(response.errors);
    }

    const institution: Institution = {
      id: institutionRecord.id,
      userId: institutionRecord.userId,
      accounts: response.data.accounts.map(this.toAccount)
    };
    return this.success(institution);
  }

  private toAccount(externalAccount: AccountBase): Account {
    const account: Account = {
      id: '',
      externalId: externalAccount.account_id,
      balance: {
        current: externalAccount.balances.current ?? 0,
        available: externalAccount.balances.available ?? 0
      }
    };

    return account;
  }
}
