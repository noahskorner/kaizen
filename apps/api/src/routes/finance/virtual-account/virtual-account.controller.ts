import { CreateVirtualAccountService } from '@kaizen/finance-server';
import { catchAsync } from '../../../middleware/catch-async';
import { Controller } from '../../controller';
import { Request, Response } from 'express';
import { CreateVirtualAccountRequest } from '@kaizen/finance';

export class VirtualAccountController extends Controller {
  constructor(
    private readonly _createVirtualAccountService: CreateVirtualAccountService
  ) {
    super();
  }

  public create = catchAsync(async (req: Request, res: Response) => {
    const request: CreateVirtualAccountRequest = req.body;

    const response = await this._createVirtualAccountService.create({
      ...request,
      userId: req.user.id
    });

    if (response.type === 'FAILURE') {
      return this.badRequest(res, response);
    }
    return this.created(res, response);
  });
}
