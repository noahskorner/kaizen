import { ErrorCode, hasErrorFor } from '@kaizen/core';
import {
  AuthenticatedEndpointBuilder,
  Controller,
  Middleware
} from '@kaizen/core-server';
import {
  IUpdateTransactionCategoryService,
  UpdateTransactionCategoryCommand,
  UpdateTransactionCategoryRequest
} from '@kaizen/finance';

export class UpdateTransactionCategoryController extends Controller {
  constructor(
    private readonly authenticate: Middleware,
    private readonly updateTransactionCategoryService: IUpdateTransactionCategoryService
  ) {
    super();
    this.updateTransactionCategoryService = updateTransactionCategoryService;
  }

  public update = new AuthenticatedEndpointBuilder((req, res, next) =>
    this.authenticate(req, res, next)
  )
    .use(async (req, res, next) => {
      const result = await this.updateTransactionCategoryService.update({
        userId: req.user.id,
        ...(req.body as UpdateTransactionCategoryRequest)
      } satisfies UpdateTransactionCategoryCommand);

      if (result.type === 'FAILURE') {
        if (
          hasErrorFor(
            result,
            ErrorCode.UPDATE_TRANSACTION_CATEGORY_TRANSACTION_NOT_FOUND
          ) ||
          hasErrorFor(result, ErrorCode.UPDATE_TRANSACTION_CATEGORY_NOT_FOUND)
        ) {
          return this.notFound(res, next, result);
        }

        return this.internalServerError(res, next, result);
      }

      return this.ok(res, next, result);
    })
    .build();
}
