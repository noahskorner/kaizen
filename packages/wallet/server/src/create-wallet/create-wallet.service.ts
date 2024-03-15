import {
  CreateWalletAlreadyExistsError,
  ErrorCode,
  ServiceResponse
} from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  ICreateWalletRepository,
  CreateWalletCommand,
  Wallet,
  ICreateWalletService,
  IGetWalletRepository,
  CreateWalletValidator,
  WalletAdapter
} from '@kaizen/wallet';

export class CreateWalletService
  extends Service
  implements ICreateWalletService
{
  constructor(
    private readonly _getWalletRepository: IGetWalletRepository,
    private readonly _createWalletRepository: ICreateWalletRepository
  ) {
    super();
  }

  public async create(
    command: CreateWalletCommand
  ): Promise<ServiceResponse<Wallet>> {
    const errors = CreateWalletValidator.validate(command);
    if (errors.length > 0) return this.failures(errors);

    const existingWalletRecord =
      await this._getWalletRepository.getByUserId(command);
    if (existingWalletRecord != null) {
      const error: CreateWalletAlreadyExistsError = {
        code: ErrorCode.CREATE_WALLET_ALREADY_EXISTS_FOR_USER,
        params: command
      };
      return this.failure(error);
    }

    const walletRecord = await this._createWalletRepository.create(command);
    const wallet = WalletAdapter.toWallet(walletRecord);
    return this.success(wallet);
  }
}
