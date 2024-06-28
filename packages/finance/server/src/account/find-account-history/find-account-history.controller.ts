import {
  FindAccountHistoryRequest,
  IFindAccountHistoryService
} from '@kaizen/finance';
import { ErrorCode, hasErrorFor } from '@kaizen/core';
import {
  AuthenticatedEndpointBuilder,
  Controller,
  Middleware
} from '@kaizen/core-server';

export class FindAccountHistoryController extends Controller {
  constructor(
    private readonly authenticate: Middleware,
    private readonly findAccountHistoryService: IFindAccountHistoryService
  ) {
    super();
  }

  public find = new AuthenticatedEndpointBuilder((req, res, next) =>
    this.authenticate(req, res, next)
  )
    .use(async (req, res, next) => {
      const request: FindAccountHistoryRequest = {
        page: parseInt(req.query.page as string),
        pageSize: parseInt(req.query.pageSize as string),
        startDate: req.query.startDate as string,
        endDate: req.query.endDate as string
      };

      const response = await this.findAccountHistoryService.find({
        ...request,
        userId: req.user.id
      });

      if (response.type == 'FAILURE') {
        if (
          hasErrorFor(response, ErrorCode.FIND_ACCOUNT_HISTORY_INVALID_PAGE) ||
          hasErrorFor(
            response,
            ErrorCode.FIND_ACCOUNT_HISTORY_INVALID_PAGE_SIZE
          ) ||
          hasErrorFor(
            response,
            ErrorCode.FIND_ACCOUNT_HISTORY_INVALID_START_DATE
          ) ||
          hasErrorFor(
            response,
            ErrorCode.FIND_ACCOUNT_HISTORY_INVALID_END_DATE
          ) ||
          hasErrorFor(
            response,
            ErrorCode.FIND_ACCOUNT_HISTORY_INVALID_TIMEFRAME
          )
        ) {
          return this.badRequest(res, next, response);
        }
        return this.internalServerError(res, next, response);
      }

      return this.ok(res, next, response);
    })
    .build();
}
