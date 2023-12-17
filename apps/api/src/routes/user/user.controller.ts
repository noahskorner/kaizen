import { Request, Response } from 'express';
import { catchAsync } from '../../middleware/catch-async';
import { Controller } from '../controller';
import { CreateLinkTokenService, CreateUserService } from '@kaizen/user-server';
import { CreateLinkTokenRequest, CreateUserRequest } from '@kaizen/user';
import { ErrorKey, hasErrorFor } from '@kaizen/core';

export class UserController extends Controller {
  constructor(
    private readonly _createUserService: CreateUserService,
    private readonly _createLinkTokenService: CreateLinkTokenService
  ) {
    super();
  }

  public create = catchAsync(async (req: Request, res: Response) => {
    const request: CreateUserRequest = req.body;
    const response = await this._createUserService.create(request);

    if (response.type === 'FAILURE') {
      return this.badRequest(res, response);
    }

    return this.protected(res, response);
  });

  public createLinkToken = catchAsync(async (req: Request, res: Response) => {
    const request: CreateLinkTokenRequest = {
      userId: req.user.id
    };
    const response = await this._createLinkTokenService.create(request);

    if (response.type === 'FAILURE') {
      if (hasErrorFor(response, ErrorKey.CREATE_LINK_TOKEN_USER_NOT_FOUND)) {
        return this.badRequest(res, response);
      } else return this.internalServerError(res, response);
    }

    return this.protected(res, response);
  });
}
