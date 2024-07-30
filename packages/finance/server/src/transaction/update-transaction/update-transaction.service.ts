import {
  ErrorCode,
  ServiceError,
  ServiceFailureResponse,
  ServiceResponse,
  UpdateTransactionInvalidAmountError,
  UpdateTransactionInvalidDescriptionError,
  UpdateTransactionInvalidMerchantNameError,
  UpdateTransactionInvalidNameError,
  UpdateTransactionNotFoundError
} from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  GetTransactionQuery,
  IGetTransactionRepository,
  IUpdateTransactionRepository,
  IUpdateTransactionService,
  Transaction,
  TransactionAdapter,
  UpdateTransactionCommand,
  UpdateTransactionQuery,
  UpdateTransactionValidator
} from '@kaizen/finance';

export class UpdateTransactionService
  extends Service
  implements IUpdateTransactionService
{
  constructor(
    private readonly getTransactionRepository: IGetTransactionRepository,
    private readonly updateTransactionRepository: IUpdateTransactionRepository
  ) {
    super();
  }

  public async update(
    command: UpdateTransactionCommand
  ): Promise<ServiceResponse<Transaction>> {
    const transaction = await this.getTransactionRepository.get({
      transactionId: command.id,
      userId: command.userId
    } satisfies GetTransactionQuery);

    if (transaction == null) {
      return this.failure({
        code: ErrorCode.UPDATE_TRANSACTION_NOT_FOUND,
        params: {
          userId: command.userId,
          transactionId: command.id
        }
      } satisfies UpdateTransactionNotFoundError);
    }

    const errors = UpdateTransactionValidator.validate(command);
    if (errors.length) {
      return this.validationFailure(command, errors);
    }

    const updatedTransaction = await this.updateTransactionRepository.update({
      id: command.id,
      name: command.name,
      amount: command.amount,
      description: command.description,
      merchantName: command.merchantName
    } satisfies UpdateTransactionQuery);
    return this.success(TransactionAdapter.toTransaction(updatedTransaction));
  }

  private validationFailure(
    command: UpdateTransactionCommand,
    codes: ErrorCode[]
  ): ServiceFailureResponse {
    const errors: ServiceError[] = [];

    if (codes.includes(ErrorCode.UPDATE_TRANSACTION_INVALID_NAME)) {
      errors.push({
        code: ErrorCode.UPDATE_TRANSACTION_INVALID_NAME,
        params: {
          userId: command.userId,
          transactionId: command.id,
          name: command.name
        }
      } satisfies UpdateTransactionInvalidNameError);
    }

    if (codes.includes(ErrorCode.UPDATE_TRANSACTION_INVALID_AMOUNT)) {
      errors.push({
        code: ErrorCode.UPDATE_TRANSACTION_INVALID_AMOUNT,
        params: {
          userId: command.userId,
          transactionId: command.id,
          amount: command.amount
        }
      } satisfies UpdateTransactionInvalidAmountError);
    }

    if (codes.includes(ErrorCode.UPDATE_TRANSACTION_INVALID_DESCRIPTION)) {
      errors.push({
        code: ErrorCode.UPDATE_TRANSACTION_INVALID_DESCRIPTION,
        params: {
          userId: command.userId,
          transactionId: command.id,
          description: command.description
        }
      } satisfies UpdateTransactionInvalidDescriptionError);
    }

    if (codes.includes(ErrorCode.UPDATE_TRANSACTION_INVALID_MERCHANT_NAME)) {
      errors.push({
        code: ErrorCode.UPDATE_TRANSACTION_INVALID_MERCHANT_NAME,
        params: {
          userId: command.userId,
          transactionId: command.id,
          merchantName: command.merchantName
        }
      } satisfies UpdateTransactionInvalidMerchantNameError);
    }

    return this.failures(errors);
  }
}
