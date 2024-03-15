import { ServiceResponse } from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  ICreateWalletRepository,
  CreateWalletCommand,
  Wallet,
  ICreateWalletService
} from '@kaizen/wallet';

export class CreateWalletService
  extends Service
  implements ICreateWalletService
{
  constructor(
    private readonly _createWalletRepository: ICreateWalletRepository
  ) {
    super();
  }

  public async create(
    command: CreateWalletCommand
  ): Promise<ServiceResponse<Wallet>> {
    throw new Error();
  }
}
