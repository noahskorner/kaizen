import { Service } from '@kaizen/core-server';
import { ApiResponse } from '@kaizen/core';
import {
  FindVirtualAccountsCommand,
  IFindVirtualAccountsRepository,
  IFindVirtualAccountsService,
  VirtualAccount
} from '@kaizen/finance';
import { VirtualAccountAdapter } from '../virtual-account.adapter';

export class FindVirtualAccountsService
  extends Service
  implements IFindVirtualAccountsService
{
  constructor(
    private readonly _findVirtualAccountsRepository: IFindVirtualAccountsRepository
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
