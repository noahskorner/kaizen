import { FindVirtualAccountsRepository, Service } from '@kaizen/core-server';
import { FindVirtualAccountsCommand } from './find-virtual-accounts.command';
import { ApiResponse } from '@kaizen/core';
import { VirtualAccount } from '@kaizen/finance';
import { VirtualAccountAdapter } from '../virtual-account.adapter';

export class FindVirtualAccountsService extends Service {
  constructor(
    private readonly _findVirtualAccountsRepository: FindVirtualAccountsRepository
  ) {
    super();
  }

  public async find(
    command: FindVirtualAccountsCommand
  ): Promise<ApiResponse<VirtualAccount[]>> {
    const virtualAccountRecords =
      await this._findVirtualAccountsRepository.find(command);
    const virtualAccounts = virtualAccountRecords.map(
      VirtualAccountAdapter.toVirtualAccount
    );

    return this.success(virtualAccounts);
  }
}
