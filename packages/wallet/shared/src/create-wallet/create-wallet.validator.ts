import {
  CreateWalletMustProvideUserIdError,
  ErrorCode,
  ServiceError
} from '@kaizen/core';
import { CreateWalletCommand } from './create-wallet.command';

export class CreateWalletValidator {
  public static validate(command: CreateWalletCommand): ServiceError[] {
    if (command.userId != null) return [];

    const error: CreateWalletMustProvideUserIdError = {
      code: ErrorCode.CREATE_WALLET_MUST_PROVIDE_USER_ID,
      params: {
        userId: command.userId
      }
    };

    return [error];
  }
}
