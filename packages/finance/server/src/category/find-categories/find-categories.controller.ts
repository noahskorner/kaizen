import {
  AuthenticatedRequestHandlerBuilder,
  Controller,
  Middleware
} from '@kaizen/core-server';
import { FindCategoriesCommand, IFindCategoriesService } from '@kaizen/finance';

export class FindCategoriesController extends Controller {
  constructor(
    private readonly authenticate: Middleware,
    private readonly findCategoriesService: IFindCategoriesService
  ) {
    super();
  }

  public find = new AuthenticatedRequestHandlerBuilder((req, res, next) =>
    this.authenticate(req, res, next)
  )
    .use(async (req, res, next) => {
      const response = await this.findCategoriesService.find({
        userId: req.user.id
      } satisfies FindCategoriesCommand);

      if (response.type == 'FAILURE') {
        return this.internalServerError(res, next, response);
      }

      return this.ok(res, next, response);
    })
    .build();
}
