import { GetWalletByUserIdCommand, IGetWalletService } from '@kaizen/wallet';
import { Controller } from '../controller';
import { Request, Response } from 'express';
import {
  ErrorCode,
  GetWalletNotYourWalletError,
  ServiceFailureResponse,
  hasErrorFor
} from '@kaizen/core';
import { catchAsync } from '../../middleware/catch-async';

const GET_WALLET_FORBIDDEN_ERROR: GetWalletNotYourWalletError = {
  code: ErrorCode.GET_WALLET_NOT_YOUR_WALLET
};

const GET_WALLET_FORBIDDEN_RESPONSE: ServiceFailureResponse = {
  type: 'FAILURE',
  errors: [GET_WALLET_FORBIDDEN_ERROR]
};

export class GetWalletController extends Controller {
  constructor(private readonly getWalletService: IGetWalletService) {
    super();
  }

  public get = catchAsync(async (req: Request, res: Response) => {
    if (req.params.userId !== req.user.id) {
      return this.forbidden(res, GET_WALLET_FORBIDDEN_RESPONSE);
    }

    const command: GetWalletByUserIdCommand = {
      userId: req.user.id
    };
    const response = await this.getWalletService.getByUserId(command);

    if (response.type === 'FAILURE') {
      if (hasErrorFor(response, ErrorCode.GET_WALLET_NOT_FOUND)) {
        return this.notFound(res, response);
      }

      return this.internalServerError(res);
    }

    return this.ok(res, response);
  });
}
