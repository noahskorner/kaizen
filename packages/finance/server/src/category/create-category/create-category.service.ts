import {
  CreateCategoryAlreadyExistsError,
  CreateCategoryMustProvideNameError,
  ErrorCode,
  ServiceResponse
} from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  Category,
  CategoryAdapter,
  CreateCategoryCommand,
  CreateCategoryQuery,
  GetCategoryByNameQuery,
  ICreateCategoryRepository,
  ICreateCategoryService,
  IGetCategoryRepository
} from '@kaizen/finance';

export class CreateCategoryService
  extends Service
  implements ICreateCategoryService
{
  constructor(
    private readonly _getCategoryRepository: IGetCategoryRepository,
    private readonly _createCategoryRepository: ICreateCategoryRepository
  ) {
    super();
  }

  public async create(
    command: CreateCategoryCommand
  ): Promise<ServiceResponse<Category>> {
    if (command.name == null || command.name === '') {
      const error: CreateCategoryMustProvideNameError = {
        code: ErrorCode.CREATE_CATEGORY_MUST_PROVIDE_NAME,
        params: {
          userId: command.userId
        }
      };
      return this.failure(error);
    }

    const existingCategory = await this._getCategoryRepository.getByName(
      command satisfies GetCategoryByNameQuery
    );
    if (existingCategory != null) {
      const error: CreateCategoryAlreadyExistsError = {
        code: ErrorCode.CREATE_CATEGORY_ALREADY_EXISTS,
        params: {
          userId: command.userId,
          name: command.name
        }
      };
      return this.failure(error);
    }

    const categoryRecord = await this._createCategoryRepository.create(
      command satisfies CreateCategoryQuery
    );
    return this.success(CategoryAdapter.toCategory(categoryRecord));
  }
}
