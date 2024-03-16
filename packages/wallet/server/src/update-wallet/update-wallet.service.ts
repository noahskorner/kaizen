import { Service } from '@kaizen/core-server';
import {
  IGetWalletRepository,
  IUpdateWalletRepository,
  IUpdateWalletService,
  UpdateWalletCommand,
  UpdateWalletQuery,
  UpdateWalletValidator,
  Wallet,
  WalletAdapter,
  WalletRecord
} from '@kaizen/wallet';
import {
  ErrorCode,
  ServiceResponse,
  UpdateWalletNotFoundError
} from '@kaizen/core';

export class UpdateWalletService
  extends Service
  implements IUpdateWalletService
{
  constructor(
    private readonly _getWalletRepository: IGetWalletRepository,
    private readonly _updateWalletRepository: IUpdateWalletRepository
  ) {
    super();
  }

  public async update(
    command: UpdateWalletCommand
  ): Promise<ServiceResponse<Wallet>> {
    const errors = UpdateWalletValidator.validate(command);
    if (errors.length > 0) return this.failures(errors);

    const walletRecordResponse = await this._getExistingWallet(command);
    if (walletRecordResponse.type === 'FAILURE') return walletRecordResponse;

    const walletRecord = walletRecordResponse.data;
    const query: UpdateWalletQuery = {
      walletId: walletRecord.id,
      transactionId: command.transactionId,
      amount: command.amount
    };
    const response = await this._updateWalletRepository.update(query);
    if (response.type === 'FAILURE') return response;

    const updatedWallet = WalletAdapter.toWallet(response.data);
    return this.success(updatedWallet);
  }

  private async _getExistingWallet(
    command: UpdateWalletCommand
  ): Promise<ServiceResponse<WalletRecord>> {
    const walletRecord = await this._getWalletRepository.getByUserId({
      userId: command.userId
    });
    if (walletRecord == null) {
      const error: UpdateWalletNotFoundError = {
        code: ErrorCode.UPDATE_WALLET_NOT_FOUND,
        params: {
          userId: command.userId
        }
      };
      return this.failure(error);
    }

    return this.success(walletRecord);
  }
}
