import { SyncAccountsCommand } from '@kaizen/finance';
import { catchAsync } from '../../../../middleware/catch-async';
import { Controller } from '../../../controller';
import { SyncAccountsService } from '@kaizen/finance-server';
import { Request, Response } from 'express';

export class AccountController extends Controller {
  constructor(private readonly _syncAccountsService: SyncAccountsService) {
    super();
  }

  public sync = catchAsync(async (req: Request, res: Response) => {
    const command: SyncAccountsCommand = {
      userId: req.user.id
    };

    const response = await this._syncAccountsService.sync(command);
    if (response.type === 'FAILURE') {
      return this.internalServerError(res, response);
    }

    return this.ok(res, response);
  });
}
