import {
  ErrorCode,
  ServiceResponse,
  UpdateCategoryNotFoundError
} from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  Category,
  CategoryAdapter,
  GetTransactionByCategoryQuery,
  IGetTransactionRepository,
  IUpdateCategoryRepository,
  IUpdateCategoryService,
  UpdateCategoryCommand,
  UpdateCategoryQuery
} from '@kaizen/finance';

export class UpdateCategoryService
  extends Service
  implements IUpdateCategoryService
{
  constructor(
    private readonly getTransactionRepostiory: IGetTransactionRepository,
    private readonly updateCategoryRepository: IUpdateCategoryRepository
  ) {
    super();
  }

  public async update(
    command: UpdateCategoryCommand
  ): Promise<ServiceResponse<Category>> {
    const transaction = await this.getTransactionRepostiory.getByCategory({
      userId: command.userId,
      transactionId: command.transactionId,
      categoryId: command.categoryId
    } satisfies GetTransactionByCategoryQuery);

    if (transaction == null) {
      return this.failure({
        code: ErrorCode.UPDATE_CATEGORY_NOT_FOUND,
        params: {
          userId: command.userId,
          transactionId: command.transactionId,
          categoryId: command.categoryId
        }
      } satisfies UpdateCategoryNotFoundError);
    }

    const categoryRecord = await this.updateCategoryRepository.update({
      categoryId: command.categoryId,
      name: command.userCategory ?? '' // TODO: FIX THIS
    } satisfies UpdateCategoryQuery);

    return this.success(CategoryAdapter.toCategory(categoryRecord));
  }
}
