import { CreateVirtualAccountRepository, Service } from '@kaizen/core-server';
import { CreateVirtualAccountCommand } from './create-virtual-account.command';
import { ApiError, ApiResponse, Errors } from '@kaizen/core';
import { VirtualAccount } from '@kaizen/finance';
import { VirtualAccountAdapter } from '../virtual-account.adapter';

export class CreateVirtualAccountService extends Service {
  constructor(
    private readonly _createVirtualAccountRepository: CreateVirtualAccountRepository
  ) {
    super();
  }

  public async create(
    command: CreateVirtualAccountCommand
  ): Promise<ApiResponse<VirtualAccount>> {
    const errors = this.validate(command);
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

  private validate(command: CreateVirtualAccountCommand): ApiError[] {
    const errors: ApiError[] = [];

    if (
      command.name == null ||
      command.name.length < 1 ||
      command.name.trim() === ''
    ) {
      errors.push(Errors.CREATE_VIRTUAL_ACCOUNT_INVALID_NAME);
    }
    if (
      command.balance == null ||
      isNaN(parseInt(command.balance as unknown as string)) ||
      command.balance <= 0
    ) {
      errors.push(Errors.CREATE_VIRTUAL_ACCOUNT_INVALID_BALANCE);
    }
    if (
      command.amount == null ||
      isNaN(parseInt(command.amount as unknown as string)) ||
      command.amount <= 0
    ) {
      errors.push(Errors.CREATE_VIRTUAL_ACCOUNT_INVALID_AMOUNT);
    }
    if (command.frequency == null) {
      errors.push(Errors.CREATE_VIRTUAL_ACCOUNT_INVALID_FREQUENCY);
    }

    return errors;
  }
}
