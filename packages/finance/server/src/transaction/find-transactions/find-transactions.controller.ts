import {
  FindTransactionsRequest,
  IFindTransactionsService
} from '@kaizen/finance';
import { ErrorCode, hasErrorFor } from '@kaizen/core';
import {
  AuthenticatedRequestHandlerBuilder,
  Controller,
  Middleware
} from '@kaizen/core-server';

export class FindTransactionsController extends Controller {
  constructor(
    private readonly authenticate: Middleware,
    private readonly findTransactionsService: IFindTransactionsService
  ) {
    super();
  }

  public find = new AuthenticatedRequestHandlerBuilder((req, res, next) =>
    this.authenticate(req, res, next)
  )
    .use(async (req, res, next) => {
      const request: FindTransactionsRequest = {
        page: parseInt(req.query.page as string),
        pageSize: req.query.pageSize
          ? parseInt(req.query.pageSize as string)
          : undefined,
        startDate: req.query.startDate as string | undefined,
        endDate: req.query.endDate as string | undefined
      };

      const response = await this.findTransactionsService.find({
        ...request,
        userId: req.user.id
      });

      if (response.type == 'FAILURE') {
        if (
          hasErrorFor(response, ErrorCode.FIND_TRANSACTIONS_INVALID_PAGE) ||
          hasErrorFor(
            response,
            ErrorCode.FIND_TRANSACTIONS_INVALID_PAGE_SIZE
          ) ||
          hasErrorFor(
            response,
            ErrorCode.FIND_TRANSACTIONS_INVALID_START_DATE
          ) ||
          hasErrorFor(response, ErrorCode.FIND_TRANSACTIONS_INVALID_END_DATE) ||
          hasErrorFor(response, ErrorCode.FIND_TRANSACTIONS_INVALID_TIMEFRAME)
        ) {
          return this.badRequest(res, next, response);
        }
        return this.internalServerError(res, next, response);
      }

      return this.ok(res, next, response);
    })
    .build();
}
