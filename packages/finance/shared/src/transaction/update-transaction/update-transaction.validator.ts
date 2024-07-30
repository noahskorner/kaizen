import { ErrorCode } from '@kaizen/core';
import { UpdateTransactionRequest } from './update-transaction.request';

export class UpdateTransactionValidator {
  public static validate(request: UpdateTransactionRequest): ErrorCode[] {
    return [
      ...UpdateTransactionValidator.validateName(request),
      ...UpdateTransactionValidator.validateAmount(request),
      ...UpdateTransactionValidator.validateMerchantName(request),
      ...UpdateTransactionValidator.validateDescription(request)
    ];
  }

  public static validateName(request: UpdateTransactionRequest): ErrorCode[] {
    const errors: ErrorCode[] = [];

    if (
      request.name != null &&
      (request.name.length < 1 || request.name.length > 100)
    ) {
      errors.push(ErrorCode.UPDATE_TRANSACTION_INVALID_NAME);
    }

    return errors;
  }

  public static validateAmount(request: UpdateTransactionRequest): ErrorCode[] {
    const errors: ErrorCode[] = [];

    if (request.amount != null && typeof request.amount !== 'number') {
      errors.push(ErrorCode.UPDATE_TRANSACTION_INVALID_AMOUNT);
    }

    return errors;
  }

  public static validateMerchantName(
    request: UpdateTransactionRequest
  ): ErrorCode[] {
    const errors: ErrorCode[] = [];

    if (
      request.merchantName != null &&
      (request.merchantName.length < 1 || request.merchantName.length > 100)
    ) {
      errors.push(ErrorCode.UPDATE_TRANSACTION_INVALID_MERCHANT_NAME);
    }

    return errors;
  }

  public static validateDescription(
    request: UpdateTransactionRequest
  ): ErrorCode[] {
    const errors: ErrorCode[] = [];

    if (
      request.description != null &&
      (request.description.length < 1 || request.description.length > 255)
    ) {
      errors.push(ErrorCode.UPDATE_TRANSACTION_INVALID_DESCRIPTION);
    }

    return errors;
  }
}
