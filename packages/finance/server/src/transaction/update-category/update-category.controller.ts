import { ErrorCode, hasErrorFor } from '@kaizen/core';
import {
  AuthenticatedRequestHandlerBuilder,
  Controller,
  Middleware
} from '@kaizen/core-server';
import {
  IUpdateCategoryService,
  UpdateCategoryCommand,
  UpdateCategoryRequest
} from '@kaizen/finance';

export class UpdateCategoryController extends Controller {
  constructor(
    private readonly authenticate: Middleware,
    private readonly updateCategoryService: IUpdateCategoryService
  ) {
    super();
    this.updateCategoryService = updateCategoryService;
  }

  public update = new AuthenticatedRequestHandlerBuilder((req, res, next) =>
    this.authenticate(req, res, next)
  )
    .use(async (req, res, next) => {
      const result = await this.updateCategoryService.update({
        userId: req.user.id,
        transactionId: req.params.transactionId,
        categoryId: req.params.categoryId,
        ...(req.body as UpdateCategoryRequest)
      } satisfies UpdateCategoryCommand);

      if (result.type === 'FAILURE') {
        if (hasErrorFor(result, ErrorCode.UPDATE_CATEGORY_NOT_FOUND)) {
          return this.notFound(res, next, result);
        }

        return this.internalServerError(res, next, result);
      }

      return this.ok(res, next, result);
    })
    .build();
}
