import { Service } from '@kaizen/core-server';
import { ServiceResponse } from '@kaizen/core';
import {
  FindVirtualAccountsCommand,
  IFindVirtualAccountsRepository,
  IFindVirtualAccountsService,
  VirtualAccount,
  VirtualAccountAdapter
} from '@kaizen/finance';

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
  ): Promise<ServiceResponse<VirtualAccount[]>> {
    const virtualAccountRecords =
      await this._findVirtualAccountsRepository.find(command);
    const virtualAccounts = virtualAccountRecords.map(
      VirtualAccountAdapter.toVirtualAccount
    );

    return this.success(virtualAccounts);
  }
}
