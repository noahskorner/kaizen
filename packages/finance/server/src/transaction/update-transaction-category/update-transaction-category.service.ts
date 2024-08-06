import {
  ErrorCode,
  ServiceResponse,
  UpdateTransactionCategoryNotFoundError,
  UpdateTransactionCategoryTransactionNotFoundError
} from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  BulkDeleteTransactionCategoryQuery,
  CategoryRecord,
  CreateTransactionCategoryQuery,
  GetCategoryQuery,
  GetTransactionQuery,
  ICreateTransactionCategoryRepository,
  IDeleteTransactionCategoryRepository,
  IGetCategoryRepository,
  IGetTransactionRepository,
  IUpdateTransactionCategoryService,
  Transaction,
  TransactionAdapter,
  TransactionCategoryRecord,
  TransactionRecord,
  UpdateTransactionCategoryCommand
} from '@kaizen/finance';

export class UpdateTransactionCategoryService
  extends Service
  implements IUpdateTransactionCategoryService
{
  constructor(
    private readonly getTransactionRepostiory: IGetTransactionRepository,
    private readonly getCategoryRepository: IGetCategoryRepository,
    private readonly deleteTransactionCategoryRepository: IDeleteTransactionCategoryRepository,
    private readonly createTransactionCategoryRepository: ICreateTransactionCategoryRepository
  ) {
    super();
  }

  public async update(
    command: UpdateTransactionCategoryCommand
  ): Promise<ServiceResponse<Transaction>> {
    // validate the transaction and category exist
    const transactionResponse = await this.validateTransactionExists(command);
    if (transactionResponse.type === 'FAILURE') return transactionResponse;
    const transactionRecord = transactionResponse.data;

    const categoryResponse = await this.validateCategoryExists(command);
    if (categoryResponse.type === 'FAILURE') return categoryResponse;
    const category = categoryResponse.data;

    // delete the old transaction categories at this level and below
    const transactionCategoryIdsToDelete =
      this.findTransactionCategoryIdsToDelete(
        category.parentId,
        transactionRecord.categories
      );
    await this.deleteTransactionCategoryRepository.bulkDelete({
      ids: transactionCategoryIdsToDelete
    } satisfies BulkDeleteTransactionCategoryQuery);

    // create a new transaction category at this level
    const transactionCategory =
      await this.createTransactionCategoryRepository.create({
        categoryId: command.categoryId,
        transactionId: command.transactionId
      } satisfies CreateTransactionCategoryQuery);

    // update the transaction record with the new transaction categories
    const updatedTransactionRecord: TransactionRecord = {
      ...transactionRecord,
      categories: [
        ...transactionRecord.categories.filter(
          (transactionCategory) =>
            !transactionCategoryIdsToDelete.includes(transactionCategory.id)
        ),
        transactionCategory
      ]
    };

    return this.success(
      TransactionAdapter.toTransaction(updatedTransactionRecord)
    );
  }

  private async validateTransactionExists(
    command: UpdateTransactionCategoryCommand
  ): Promise<ServiceResponse<TransactionRecord>> {
    const transactionRecord = await this.getTransactionRepostiory.get({
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

    return this.success(transactionRecord);
  }

  private async validateCategoryExists(
    command: UpdateTransactionCategoryCommand
  ): Promise<ServiceResponse<CategoryRecord>> {
    const category = await this.getCategoryRepository.get(
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

    return this.success(category);
  }

  private findTransactionCategoryIdsToDelete(
    parentId: string | null,
    transactionCategories: TransactionCategoryRecord[]
  ): string[] {
    return this.findTransactionCategoriesToDeleteRecursive(
      parentId,
      transactionCategories
    ).map((transactionCategory) => transactionCategory.id);
  }

  private findTransactionCategoriesToDeleteRecursive(
    parentId: string | null,
    transactionCategories: TransactionCategoryRecord[],
    visited: Set<string | null> = new Set()
  ): TransactionCategoryRecord[] {
    if (visited.has(parentId)) {
      return [];
    }

    const transactionCategoriesToDelete = transactionCategories.filter(
      (transactionCategory) =>
        transactionCategory.category.parentId === parentId
    );
    visited.add(parentId);
    for (const transactionCategory of transactionCategoriesToDelete) {
      transactionCategoriesToDelete.push(
        ...this.findTransactionCategoriesToDeleteRecursive(
          transactionCategory.category.id,
          transactionCategories,
          visited
        )
      );
    }

    return transactionCategoriesToDelete;
  }
}
