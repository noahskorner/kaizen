import { catchAsync } from '../../../../middleware/catch-async';
import { Request, Response } from 'express';
import {
  CreateInstitutionCommand,
  CreateInstitutionRequest,
  ICreateInstitutionService
} from '@kaizen/finance';
import { ErrorCode, hasErrorFor } from '@kaizen/core';
import { Controller } from '../../../controller';

export class CreateInstitutionController extends Controller {
  constructor(
    private readonly _createInstitutionService: ICreateInstitutionService
  ) {
    super();
  }

  public create = catchAsync(async (req: Request, res: Response) => {
    const request: CreateInstitutionRequest = req.body;
    const command: CreateInstitutionCommand = {
      userId: req.user.id,
      ...request
    };
    const response = await this._createInstitutionService.create(command);

    if (response.type === 'FAILURE') {
      if (
        hasErrorFor(
          response,
          ErrorCode.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN
        )
      ) {
        return this.badRequest(res, response);
      } else return this.internalServerError(res, response);
    }

    return this.created(res, response);
  });
}
