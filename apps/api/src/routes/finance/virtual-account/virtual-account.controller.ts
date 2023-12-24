import { catchAsync } from '../../../middleware/catch-async';
import { Controller } from '../../controller';
import { Request, Response } from 'express';
import {
  CreateVirtualAccountRequest,
  ICreateVirtualAccountService,
  IFindVirtualAccountsService
} from '@kaizen/finance';

export class VirtualAccountController extends Controller {
  constructor(
    private readonly _createVirtualAccountService: ICreateVirtualAccountService,
    private readonly _findVirtualAccountsService: IFindVirtualAccountsService
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

  public find = catchAsync(async (req: Request, res: Response) => {
    const response = await this._findVirtualAccountsService.find({
      userId: req.user.id
    });

    if (response.type === 'FAILURE') {
      return this.badRequest(res, response);
    }
    return this.ok(res, response);
  });
}
