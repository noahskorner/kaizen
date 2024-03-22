import {
  ErrorCode,
  GetWalletNotFoundError,
  ServiceResponse
} from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  GetWalletByUserIdCommand,
  GetWalletByUserIdQuery,
  IGetWalletRepository,
  IGetWalletService,
  Wallet,
  WalletAdapter
} from '@kaizen/wallet';

export class GetWalletService extends Service implements IGetWalletService {
  constructor(private readonly getWalletRepository: IGetWalletRepository) {
    super();
  }

  public async getByUserId(
    command: GetWalletByUserIdCommand
  ): Promise<ServiceResponse<Wallet>> {
    const query: GetWalletByUserIdQuery = {
      userId: command.userId
    };
    const walletRecord = await this.getWalletRepository.getByUserId(query);
    if (walletRecord == null) {
      const error: GetWalletNotFoundError = {
        code: ErrorCode.GET_WALLET_NOT_FOUND,
        params: {
          userId: command.userId
        }
      };
      return this.failure(error);
    }

    const wallet = WalletAdapter.toWallet(walletRecord);
    return this.success(wallet);
  }
}
