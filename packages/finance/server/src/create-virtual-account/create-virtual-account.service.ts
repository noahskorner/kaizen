import { Service } from '@kaizen/core-server';
import { ApiResponse } from '@kaizen/core';
import {
  CreateVirtualAccountValidator,
  ICreateVirtualAccountRepository,
  ICreateVirtualAccountService,
  VirtualAccount,
  CreateVirtualAccountCommand
} from '@kaizen/finance';
import { VirtualAccountAdapter } from '../virtual-account.adapter';

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
