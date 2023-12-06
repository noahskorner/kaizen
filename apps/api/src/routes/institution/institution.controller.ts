import { catchAsync } from '../../middleware/catch-async';
import { Request, Response } from 'express';
import {
  CreateInstitutionCommand,
  CreateInstitutionService,
  FindInstitutionsCommand,
  FindInstitutionsService
} from '@kaizen/institution-server';
import { CreateInstitutionRequest } from '@kaizen/institution';
import { ErrorKey, hasErrorFor } from '@kaizen/core';
import { Controller } from '../controller';

export class InstitutionController extends Controller {
  constructor(
    private readonly _createInstitutionService: CreateInstitutionService,
    private readonly _findInstitutionsService: FindInstitutionsService
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
          ErrorKey.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN
        )
      ) {
        return this.badRequest(res, response);
      } else return this.internalServerError(res, response);
    }

    return this.created(res, response);
  });

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
