import { CreateUserRequest } from './create-user.request';
import { CreateUserService } from '@kaizen/services';
import { Request, Response } from 'express';
import { catchAsync } from '../../middleware/catch-async';

export class UserController {
  private readonly _createUserService: CreateUserService;

  constructor() {
    this._createUserService = new CreateUserService();
  }

  public create = catchAsync(async (req: Request, res: Response) => {
    const request: CreateUserRequest = req.body;
    const response = await this._createUserService.create(request);

    if (response.type === 'FAILURE') {
      return res.sendStatus(500);
    } else {
      return res.status(201).json(response.data);
    }
  });
}
