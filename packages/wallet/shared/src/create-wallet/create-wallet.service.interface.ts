import { ServiceResponse } from '@kaizen/core';
import { Wallet } from '../wallet';
import { CreateWalletCommand } from './create-wallet.command';

export interface ICreateWalletService {
  create(command: CreateWalletCommand): Promise<ServiceResponse<Wallet>>;
}
