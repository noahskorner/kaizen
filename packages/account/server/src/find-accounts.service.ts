import { Account } from '@kaizen/account';
import { ApiResponse, Service } from '@kaizen/core';
import { FindAccountsCommand } from './find-accounts.command';
import { AccountRepository } from '@kaizen/data';

export class FindAccountsService extends Service {
  constructor(private readonly accountRepository: AccountRepository) {
    super();
  }

  public async find(
    command: FindAccountsCommand
  ): Promise<ApiResponse<Account[]>> {
    const accountRecords = await this.accountRepository.findAll(command);

    const accounts = accountRecords.map((accountRecord) => {
      const account: Account = {
        id: accountRecord.id,
        userId: accountRecord.userId
      };

      return account;
    });

    return this.success(accounts);
  }
}
