import { CreateAccountCommand } from './create-account.command';
import { Account } from '@kaizen/account';
import { plaidClient } from '@kaizen/plaid';
import { ItemPublicTokenExchangeRequest } from 'plaid';
import { ApiResponse, Errors, Service } from '@kaizen/core';
import { AccountRepository } from '@kaizen/data/src/account.repository';

export class CreateAccountService extends Service {
  constructor(private readonly _accountRepository: AccountRepository) {
    super();
  }

  public async create(
    command: CreateAccountCommand
  ): Promise<ApiResponse<Account>> {
    if (command.plaidPublicToken == null || command.plaidPublicToken === '') {
      return this.failure(Errors.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN);
    }

    // const user = await

    try {
      const request: ItemPublicTokenExchangeRequest = {
        public_token: command.plaidPublicToken
      };
      const response = await plaidClient.itemPublicTokenExchange(request);

      const accountRecord = await this._accountRepository.create(
        command.userId,
        response.data.access_token
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
