import { catchAsync } from '../../middleware/catch-async';
import { Request, Response } from 'express';
import {
  CreateAccountCommand,
  CreateAccountService
} from '@kaizen/account-server';
import { CreateAccountRequest } from '@kaizen/account';
import { ErrorKey, hasErrorFor } from '@kaizen/core';
import { Controller } from '../controller';

export class AccountController extends Controller {
  constructor(private readonly _createAccountService: CreateAccountService) {
    super();
  }

  public create = catchAsync(async (req: Request, res: Response) => {
    const request: CreateAccountRequest = req.body;
    const command: CreateAccountCommand = {
      userId: req.user.id,
      ...request
    };
    const response = await this._createAccountService.create(command);

    if (response.type === 'FAILURE') {
      if (
        hasErrorFor(
          response,
          ErrorKey.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN
        )
      ) {
        return this.badRequest(res, response);
      } else return this.internalServerError(res, response);
    }

    return this.created(res, response);
  });
}
