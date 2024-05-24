import {
  ErrorCode,
  ServiceResponse,
  UpdateTransactionCategoryNotFoundError,
  UpdateTransactionCategoryTransactionNotFoundError
} from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  GetCategoryQuery,
  GetTransactionQuery,
  IGetCategoryRepository,
  IGetTransactionRepository,
  IUpdateTransactionCategoryRepository,
  IUpdateTransactionCategoryService,
  Transaction,
  TransactionAdapter,
  UpdateTransactionCategoryCommand,
  UpdateTransactionCategoryQuery
} from '@kaizen/finance';

export class UpdateTransactionCategoryService
  extends Service
  implements IUpdateTransactionCategoryService
{
  constructor(
    private readonly _getTransactionRepostiory: IGetTransactionRepository,
    private readonly _getCategoryRepository: IGetCategoryRepository,
    private readonly _updateTransactionCategoryRepository: IUpdateTransactionCategoryRepository
  ) {
    super();
  }

  public async update(
    command: UpdateTransactionCategoryCommand
  ): Promise<ServiceResponse<Transaction>> {
    const transactionRecord = await this._getTransactionRepostiory.get({
      userId: command.userId,
      transactionId: command.transactionId
    } satisfies GetTransactionQuery);
    if (transactionRecord == null) {
      return this.failure({
        code: ErrorCode.UPDATE_TRANSACTION_CATEGORY_TRANSACTION_NOT_FOUND,
        params: {
          userId: command.userId,
          transactionId: command.transactionId
        }
      } satisfies UpdateTransactionCategoryTransactionNotFoundError);
    }

    const category = await this._getCategoryRepository.get(
      command satisfies GetCategoryQuery
    );
    if (category == null) {
      return this.failure({
        code: ErrorCode.UPDATE_TRANSACTION_CATEGORY_NOT_FOUND,
        params: {
          userId: command.userId,
          categoryId: command.categoryId
        }
      } satisfies UpdateTransactionCategoryNotFoundError);
    }

    const updatedTransactionRecord =
      await this._updateTransactionCategoryRepository.update(
        command satisfies UpdateTransactionCategoryQuery
      );

    return this.success(
      TransactionAdapter.toTransaction(updatedTransactionRecord)
    );
  }
}
