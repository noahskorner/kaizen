import {
  FindExpensesCommand,
  FindExpensesRequest,
  IFindExpensesService
} from '@kaizen/finance';
import { Controller } from '../../../controller';
import { catchAsync } from '../../../../middleware/catch-async';
import { Request, Response } from 'express';
import { ErrorCode, hasErrorFor } from '@kaizen/core';

export class FindExpensesController extends Controller {
  constructor(private readonly findExpensesService: IFindExpensesService) {
    super();
  }

  public find = catchAsync(async (req: Request, res: Response) => {
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
        return this.badRequest(res, response);
      } else {
        return this.internalServerError(res);
      }
    }

    return this.ok(res, response);
  });
}
