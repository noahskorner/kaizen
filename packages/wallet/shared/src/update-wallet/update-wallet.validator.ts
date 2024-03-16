import { ErrorCode, ServiceError } from '@kaizen/core';
import { UpdateWalletCommand } from './update-wallet.command';

export class UpdateWalletValidator {
  public static validate(command: UpdateWalletCommand): ServiceError[] {
    const errors: ServiceError[] = [];

    if (command.transactionId == null) {
      errors.push({
        code: ErrorCode.UPDATE_WALLET_MUST_PROVIDE_UNIQUE_TRANSACTION_ID,
        params: { userId: command.userId, transactionId: command.transactionId }
      });
    }

    if (command.amount == null || isNaN(command.amount)) {
      errors.push({
        code: ErrorCode.UPDATE_WALLET_MUST_PROVIDE_AMOUNT,
        params: {
          userId: command.userId,
          transactionId: command.transactionId,
          amount: command.amount
        }
      });
    }

    return errors;
  }
}
