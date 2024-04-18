import { catchAsync } from '../../../../middleware/catch-async';
import { Request, Response } from 'express';
import {
  FindInstitutionsCommand,
  IFindInstitutionsService
} from '@kaizen/finance';
import { Controller } from '../../../controller';

export class FindInstitutionsController extends Controller {
  constructor(
    private readonly _findInstitutionsService: IFindInstitutionsService
  ) {
    super();
  }

  public find = catchAsync(async (req: Request, res: Response) => {
    const command: FindInstitutionsCommand = {
      userId: req.user.id
    };
    const response = await this._findInstitutionsService.find(command);

    if (response.type === 'FAILURE') {
      return this.internalServerError(res, response);
    } else return this.ok(res, response);
  });
}
