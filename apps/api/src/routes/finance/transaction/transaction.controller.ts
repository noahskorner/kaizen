import { catchAsync } from '../../../middleware/catch-async';
import { Request, Response } from 'express';
import { Controller } from '../../controller';
import { FindTransactionsRequest } from '@kaizen/finance';
import { ErrorKey, hasErrorFor } from '@kaizen/core';
import { FindTransactionsService } from '@kaizen/finance-server';

export class TransactionController extends Controller {
  constructor(
    private readonly findTransactionsService: FindTransactionsService
  ) {
    super();
  }

  public find = catchAsync(async (req: Request, res: Response) => {
    const request: FindTransactionsRequest = {
      page: parseInt(req.query.page as string),
      pageSize: req.query.pageSize
        ? parseInt(req.query.pageSize as string)
        : undefined
    };

    const response = await this.findTransactionsService.find({
      ...request,
      userId: req.user.id
    });

    if (response.type == 'FAILURE') {
      if (
        hasErrorFor(response, ErrorKey.FIND_TRANSACTIONS_INVALID_PAGE) ||
        hasErrorFor(response, ErrorKey.FIND_TRANSACTIONS_INVALID_PAGE_SIZE)
      ) {
        return this.badRequest(res, response);
      }
      return this.internalServerError(res, response);
    }

    return this.ok(res, response);
  });
}
