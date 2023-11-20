import { Request, Response } from 'express';
import { catchAsync } from '../../middleware/catch-async';
import { Controller } from '../controller';
import { CreateUserService } from '@kaizen/user-server';
import { CreateUserRequest } from '@kaizen/user';

export class UserController extends Controller {
  private readonly _createUserService: CreateUserService;

  constructor() {
    super();
    this._createUserService = new CreateUserService();
  }

  public create = catchAsync(async (req: Request, res: Response) => {
    const request: CreateUserRequest = req.body;
    const response = await this._createUserService.create(request);

    if (response.type === 'FAILURE') {
      return this.badRequest(res, response);
    }

    return this.created(res, response);
  });
}
