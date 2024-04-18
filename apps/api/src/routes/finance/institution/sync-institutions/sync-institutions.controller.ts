import { catchAsync } from '../../../../middleware/catch-async';
import { Request, Response } from 'express';
import {
  ISyncInstitutionsService,
  SyncInstitutionsCommand
} from '@kaizen/finance';
import { Controller } from '../../../controller';

export class SyncInstitutionsController extends Controller {
  constructor(
    private readonly _syncInstitutionsService: ISyncInstitutionsService
  ) {
    super();
  }

  public sync = catchAsync(async (req: Request, res: Response) => {
    const command: SyncInstitutionsCommand = {
      userId: req.user.id
    };
    const response = await this._syncInstitutionsService.sync(command);

    if (response.type === 'FAILURE') {
      return this.internalServerError(res, response);
    } else return this.ok(res, response);
  });
}
