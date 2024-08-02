import {
  CreateCategoryAlreadyExistsError,
  CreateCategoryMustProvideNameError,
  CreateCategoryParentDoesNotExistError,
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
  GetCategoryQuery,
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
    // Validate the name is provided
    if (command.name == null || command.name === '') {
      const error: CreateCategoryMustProvideNameError = {
        code: ErrorCode.CREATE_CATEGORY_MUST_PROVIDE_NAME,
        params: {
          userId: command.userId
        }
      };
      return this.failure(error);
    }

    // Validate the category does not already exist
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

    // Validate the parent exists
    if (command.parentId != null) {
      const parentCategory = await this._getCategoryRepository.get({
        categoryId: command.parentId,
        userId: command.userId
      } satisfies GetCategoryQuery);

      if (parentCategory == null) {
        return this.failure({
          code: ErrorCode.CREATE_CATEGORY_PARENT_DOES_NOT_EXIST,
          params: {
            userId: command.userId,
            parentId: command.parentId
          }
        } satisfies CreateCategoryParentDoesNotExistError);
      }
    }

    const categoryRecord = await this._createCategoryRepository.create(
      command satisfies CreateCategoryQuery
    );
    return this.success(CategoryAdapter.toCategory(categoryRecord));
  }
}
