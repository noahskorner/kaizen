import { Request, Response } from 'express';
import { catchAsync } from '../../../middleware/catch-async';
import { Controller } from '../../controller';
import { CreateLinkTokenRequest, ICreateLinkTokenService } from '@kaizen/user';
import { ErrorCode, hasErrorFor } from '@kaizen/core';

export class CreateLinkTokenController extends Controller {
  constructor(
    private readonly _createLinkTokenService: ICreateLinkTokenService
  ) {
    super();
  }

  public createLinkToken = catchAsync(async (req: Request, res: Response) => {
    const request: CreateLinkTokenRequest = {
      userId: req.user.id
    };
    const response = await this._createLinkTokenService.create(request);

    if (response.type === 'FAILURE') {
      if (hasErrorFor(response, ErrorCode.CREATE_LINK_TOKEN_USER_NOT_FOUND)) {
        return this.badRequest(res, response);
      } else return this.internalServerError(res, response);
    }

    return this.created(res, response);
  });
}
