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
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class UpdateWalletRepository
  extends Repository
  implements IUpdateWalletRepository
{
  public update(
    query: UpdateWalletQuery
  ): Promise<ServiceResponse<WalletRecord>> {
    return this._prisma.$transaction(async (prisma) => {
      // Create unique transaction record
      return (
        prisma.walletTransactionRecord
          .create({
            data: {
              transactionId: query.transactionId,
              walletId: query.walletId,
              amount: query.amount
            }
          })
          // Update wallet balance atomically
          .then(() => {
            return prisma.walletRecord
              .update({
                where: { id: query.walletId },
                data: {
                  balance: {
                    increment: query.amount
                  }
                }
              })
              .then((updatedWallet) => {
                if (updatedWallet.balance < 0) {
                  throw new Error(ErrorCode.UPDATE_WALLET_NOT_ENOUGH_FUNDS);
                }

                // Return updated wallet record
                return {
                  type: 'SUCCESS',
                  data: updatedWallet
                } satisfies ServiceSuccessResponse<WalletRecord>;
              })
              .catch((error: Error) => {
                if (
                  error.message === ErrorCode.UPDATE_WALLET_NOT_ENOUGH_FUNDS
                ) {
                  return this._notEnoughFunds(query);
                }
                throw error;
              });
          })
          .catch((error: unknown) => {
            if (
              error instanceof PrismaClientKnownRequestError &&
              error.code === 'P2002'
            ) {
              return this._transactionAlreadyExists(query);
            }

            throw error;
          })
      );
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

  private _notEnoughFunds(query: UpdateWalletQuery): ServiceFailureResponse {
    const error: UpdateWalletNotEnoughFundsError = {
      code: ErrorCode.UPDATE_WALLET_NOT_ENOUGH_FUNDS,
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
}
