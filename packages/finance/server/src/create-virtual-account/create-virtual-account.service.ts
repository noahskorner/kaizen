import { Service } from '@kaizen/core-server';
import { CreateVirtualAccountCommand } from '@kaizen/finance/src/create-virtual-account/create-virtual-account.command';
import { ApiResponse } from '@kaizen/core';
import {
  CreateVirtualAccountValidator,
  ICreateVirtualAccountRepository,
  ICreateVirtualAccountService,
  VirtualAccount,
  VirtualAccountAdapter
} from '@kaizen/finance';

export class CreateVirtualAccountService
  extends Service
  implements ICreateVirtualAccountService
{
  constructor(
    private readonly _createVirtualAccountRepository: ICreateVirtualAccountRepository
  ) {
    super();
  }

  public async create(
    command: CreateVirtualAccountCommand
  ): Promise<ApiResponse<VirtualAccount>> {
    const errors = CreateVirtualAccountValidator.validate(command);
    if (errors.length > 0) {
      return this.failures(errors);
    }

    const query = VirtualAccountAdapter.toCreateVirtualAccountQuery(command);
    const virtualAccountRecord =
      await this._createVirtualAccountRepository.create(query);
    const virtualAccount =
      VirtualAccountAdapter.toVirtualAccount(virtualAccountRecord);

    return this.success(virtualAccount);
  }
}
