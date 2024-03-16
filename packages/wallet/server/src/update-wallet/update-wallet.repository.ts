import {
  ErrorCode,
  ServiceFailureResponse,
  ServiceResponse,
  ServiceSuccessResponse,
  UpdateWalletNotEnoughFundsError,
  UpdateWalletTransactionAlreadyExistsError
} from '@kaizen/core';
import { Repository } from '@kaizen/core-server';
import {
  IUpdateWalletRepository,
  UpdateWalletQuery,
  WalletRecord
} from '@kaizen/wallet';

export class UpdateWalletRepository
  extends Repository
  implements IUpdateWalletRepository
{
  public update(
    query: UpdateWalletQuery
  ): Promise<ServiceResponse<WalletRecord>> {
    return this._prisma.$transaction(async (prisma) => {
      // Check if transaction already exists
      const existingTransaction =
        await prisma.walletTransactionRecord.findUnique({
          where: { transactionId: query.transactionId }
        });

      if (existingTransaction) {
        return this._transactionAlreadyExists(query);
      }

      // Check if wallet has enough funds
      const wallet = await prisma.walletRecord.findUniqueOrThrow({
        where: { id: query.walletId }
      });
      const newBalance = wallet.balance + query.amount;
      if (newBalance < 0) {
        return this._notEnoughFunds(query, wallet.balance);
      }

      // Create transaction record
      await prisma.walletTransactionRecord.create({
        data: {
          transactionId: query.transactionId,
          walletId: query.walletId,
          amount: query.amount
        }
      });

      // Update wallet balance
      const updatedWallet = await prisma.walletRecord.update({
        where: { id: query.walletId },
        data: { balance: newBalance }
      });

      // Return updated wallet record
      return {
        type: 'SUCCESS',
        data: updatedWallet
      } satisfies ServiceSuccessResponse<WalletRecord>;
    });
  }

  private _transactionAlreadyExists(
    query: UpdateWalletQuery
  ): ServiceFailureResponse {
    const error: UpdateWalletTransactionAlreadyExistsError = {
      code: ErrorCode.UPDATE_WALLET_TRANSACTION_ALREADY_EXISTS,
      params: {
        walletId: query.walletId,
        transactionId: query.transactionId,
        amount: query.amount
      }
    };
    const response: ServiceFailureResponse = {
      type: 'FAILURE',
      errors: [error]
    };
    return response;
  }

  private _notEnoughFunds(
    query: UpdateWalletQuery,
    balance: number
  ): ServiceFailureResponse {
    const error: UpdateWalletNotEnoughFundsError = {
      code: ErrorCode.UPDATE_WALLET_NOT_ENOUGH_FUNDS,
      params: {
        walletId: query.walletId,
        transactionId: query.transactionId,
        amount: query.amount,
        balance: balance
      }
    };
    const response: ServiceFailureResponse = {
      type: 'FAILURE',
      errors: [error]
    };
    return response;
  }
}
