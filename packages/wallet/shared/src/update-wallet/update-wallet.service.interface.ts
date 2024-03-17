import { ServiceResponse } from '@kaizen/core';
import { Wallet } from '../wallet';
import { UpdateWalletCommand } from './update-wallet.command';

export interface IUpdateWalletService {
  update(command: UpdateWalletCommand): Promise<ServiceResponse<Wallet>>;
}
