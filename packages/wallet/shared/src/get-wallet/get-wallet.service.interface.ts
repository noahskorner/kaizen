import { ServiceResponse } from '@kaizen/core';
import { Wallet } from '../wallet';
import { GetWalletByUserIdCommand } from './get-wallet-by-user-id.command';

export interface IGetWalletService {
  getByUserId: (
    command: GetWalletByUserIdCommand
  ) => Promise<ServiceResponse<Wallet>>;
}
