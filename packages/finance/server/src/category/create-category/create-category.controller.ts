import { ErrorCode, hasErrorFor } from '@kaizen/core';
import {
  AuthenticatedEndpointBuilder,
  Controller,
  Middleware
} from '@kaizen/core-server';
import {
  CreateCategoryCommand,
  CreateCategoryRequest,
  ICreateCategoryService
} from '@kaizen/finance';

export class CreateCategoryController extends Controller {
  constructor(
    private readonly authenticate: Middleware,
    private readonly createCategoryService: ICreateCategoryService
  ) {
    super();
  }

  public create = new AuthenticatedEndpointBuilder((req, res, next) =>
    this.authenticate(req, res, next)
  )
    .use(async (req, res, next) => {
      const request: CreateCategoryCommand = {
        ...(req.body as CreateCategoryRequest),
        userId: req.user.id
      };
      const response = await this.createCategoryService.create(request);

      if (response.type == 'FAILURE') {
        if (
          hasErrorFor(response, ErrorCode.CREATE_CATEGORY_MUST_PROVIDE_NAME) ||
          hasErrorFor(response, ErrorCode.CREATE_CATEGORY_ALREADY_EXISTS)
        ) {
          return this.badRequest(res, next, response);
        }
        return this.internalServerError(res, next, response);
      }

      return this.created(res, next, response);
    })
    .build();
}
