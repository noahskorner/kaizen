import { CreateVirtualAccountRequest } from './create-virtual-account.request';
import { ErrorCode, ServiceError } from '@kaizen/core';

export class CreateVirtualAccountValidator {
  public static validate(command: CreateVirtualAccountRequest): ServiceError[] {
    return [
      ...this.validateName(command.name),
      ...this.validateBalance(command.balance),
      ...this.validateAmount(command.amount),
      ...this.validateFrequency(command.frequency)
    ];
  }

  public static validateName(name: string): ServiceError[] {
    return name == null || name.length < 1 || name.trim() === ''
      ? [
          {
            code: ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_NAME,
            params: {
              name: name
            }
          }
        ]
      : [];
  }

  public static validateBalance(balance: number): ServiceError[] {
    return balance == null ||
      isNaN(parseInt(balance as unknown as string)) ||
      balance < 0
      ? [
          {
            code: ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_BALANCE,
            params: {
              balance
            }
          }
        ]
      : [];
  }

  public static validateAmount(amount: number): ServiceError[] {
    return amount == null ||
      isNaN(parseInt(amount as unknown as string)) ||
      amount < 0
      ? [
          {
            code: ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_AMOUNT,
            params: { amount }
          }
        ]
      : [];
  }

  public static validateFrequency(frequency: string): ServiceError[] {
    return frequency == null
      ? [
          {
            code: ErrorCode.CREATE_VIRTUAL_ACCOUNT_INVALID_FREQUENCY,
            params: { frequency }
          }
        ]
      : [];
  }
}
