import { ServiceResponse } from '@kaizen/core';
import { CreateVirtualAccountCommand } from './create-virtual-account.command';
import { VirtualAccount } from '../virtual-account';

export interface ICreateVirtualAccountService {
  create(
    command: CreateVirtualAccountCommand
  ): Promise<ServiceResponse<VirtualAccount>>;
}
