import { CreateVirtualAccountRequest } from './create-virtual-account.request';
import { ApiError, Errors } from '@kaizen/core';

export class CreateVirtualAccountValidator {
  public static validate(command: CreateVirtualAccountRequest): ApiError[] {
    return [
      ...this.validateName(command.name),
      ...this.validateBalance(command.balance),
      ...this.validateAmount(command.amount),
      ...this.validateFrequency(command.frequency)
    ];
  }

  public static validateName(name: string): ApiError[] {
    return name == null || name.length < 1 || name.trim() === ''
      ? [Errors.CREATE_VIRTUAL_ACCOUNT_INVALID_NAME]
      : [];
  }

  public static validateBalance(balance: number): ApiError[] {
    return balance == null ||
      isNaN(parseInt(balance as unknown as string)) ||
      balance <= 0
      ? [Errors.CREATE_VIRTUAL_ACCOUNT_INVALID_BALANCE]
      : [];
  }

  public static validateAmount(amount: number): ApiError[] {
    return amount == null ||
      isNaN(parseInt(amount as unknown as string)) ||
      amount <= 0
      ? [Errors.CREATE_VIRTUAL_ACCOUNT_INVALID_AMOUNT]
      : [];
  }

  public static validateFrequency(frequency: string): ApiError[] {
    return frequency == null
      ? [Errors.CREATE_VIRTUAL_ACCOUNT_INVALID_FREQUENCY]
      : [];
  }
}
