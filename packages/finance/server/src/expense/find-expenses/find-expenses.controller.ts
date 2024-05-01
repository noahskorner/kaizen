import {
  FindExpensesCommand,
  FindExpensesRequest,
  IFindExpensesService
} from '@kaizen/finance';
import { ErrorCode, hasErrorFor } from '@kaizen/core';
import {
  AuthenticatedRequestHandlerBuilder,
  Controller,
  Middleware
} from '@kaizen/core-server';

export class FindExpensesController extends Controller {
  constructor(
    private readonly authenticate: Middleware,
    private readonly findExpensesService: IFindExpensesService
  ) {
    super();
  }

  public find = new AuthenticatedRequestHandlerBuilder((req, res, next) =>
    this.authenticate(req, res, next)
  )
    .use(async (req, res, next) => {
      const command: FindExpensesCommand = {
        ...(req.query as FindExpensesRequest),
        userId: req.user.id
      };
      const response = await this.findExpensesService.find(command);

      if (response.type === 'FAILURE') {
        if (
          [
            ErrorCode.FIND_EXPENSES_INVALID_START_DATE,
            ErrorCode.FIND_EXPENSES_INVALID_END_DATE,
            ErrorCode.FIND_EXPENSES_INVALID_TIMEFRAME
          ].some((code) => hasErrorFor(response, code))
        ) {
          return this.badRequest(res, next, response);
        } else {
          return this.internalServerError(res, next);
        }
      }

      return this.ok(res, next, response);
    })
    .build();
}
