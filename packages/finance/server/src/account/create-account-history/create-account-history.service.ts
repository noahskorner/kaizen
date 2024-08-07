import { ServiceResponse } from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  IFindAccountsRepository,
  ICreateAccountHistoryService,
  ICreateAccountHistoryRepository,
  CreateAccountHistoryCommand,
  AccountHistory,
  AccountHistoryRecordAdapter,
  AccountHistoryAdapter
} from '@kaizen/finance';
import { v4 as uuid } from 'uuid';

export class CreateAccountHistoryService
  extends Service
  implements ICreateAccountHistoryService
{
  constructor(
    private readonly findAccountsRepository: IFindAccountsRepository,
    private readonly createAccountHistoryRepository: ICreateAccountHistoryRepository
  ) {
    super();
  }

  public async create(
    command: CreateAccountHistoryCommand
  ): Promise<ServiceResponse<AccountHistory[]>> {
    const accounts = await this.findAccountsRepository.findByUserId(command);
    if (accounts.length === 0) {
      return this.success([]);
    }

    const snapshotId = uuid();
    const query = accounts.map((account) =>
      AccountHistoryRecordAdapter.toCreateAccountHistoryQuery(
        snapshotId,
        account
      )
    );
    const accountHistories =
      await this.createAccountHistoryRepository.bulkCreate(query);

    return this.success(
      accountHistories.map(AccountHistoryAdapter.toAccountHistory)
    );
  }
}
