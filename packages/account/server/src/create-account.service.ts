import { CreateAccountCommand } from './create-account.command';
import { Account } from '@kaizen/account';
import { ApiResponse, Errors, Service } from '@kaizen/core';
import { AccountRepository } from '@kaizen/data';
import { FinancialProvider } from '@kaizen/provider';

export class CreateAccountService extends Service {
  constructor(
    private readonly _accountRepository: AccountRepository,
    private readonly _financialProvider: FinancialProvider
  ) {
    super();
  }

  public async create(
    command: CreateAccountCommand
  ): Promise<ApiResponse<Account>> {
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

      const accountRecord = await this._accountRepository.create(
        command.userId,
        response.data
      );
      const account: Account = {
        id: accountRecord.id,
        userId: accountRecord.userId
      };
      return this.success(account);
    } catch (error) {
      console.log(error);
      return this.failure(Errors.INTERNAL_SERVER_ERROR);
    }
  }
}
