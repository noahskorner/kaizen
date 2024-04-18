import { Request, Response } from 'express';
import { catchAsync } from '../../../middleware/catch-async';
import { Controller } from '../../controller';
import { CreateUserRequest, ICreateUserService } from '@kaizen/user';

export class CreateUserController extends Controller {
  constructor(private readonly _createUserService: ICreateUserService) {
    super();
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
