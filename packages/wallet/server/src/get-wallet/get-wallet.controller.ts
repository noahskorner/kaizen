import { GetWalletByUserIdCommand, IGetWalletService } from '@kaizen/wallet';
import {
  ErrorCode,
  GetWalletNotYourWalletError,
  ServiceFailureResponse,
  hasErrorFor
} from '@kaizen/core';
import {
  AuthenticatedEndpointBuilder,
  Controller,
  Middleware
} from '@kaizen/core-server';

const GET_WALLET_FORBIDDEN_ERROR: GetWalletNotYourWalletError = {
  code: ErrorCode.GET_WALLET_NOT_YOUR_WALLET
};

const GET_WALLET_FORBIDDEN_RESPONSE: ServiceFailureResponse = {
  type: 'FAILURE',
  errors: [GET_WALLET_FORBIDDEN_ERROR]
};

export class GetWalletController extends Controller {
  constructor(
    private readonly authenticate: Middleware,
    private readonly getWalletService: IGetWalletService
  ) {
    super();
  }

  public get = new AuthenticatedEndpointBuilder((req, res, next) =>
    this.authenticate(req, res, next)
  )
    .use(async (req, res, next) => {
      if (req.params.userId !== req.user.id) {
        return this.forbidden(res, next, GET_WALLET_FORBIDDEN_RESPONSE);
      }

      const command: GetWalletByUserIdCommand = {
        userId: req.user.id
      };
      const response = await this.getWalletService.getByUserId(command);

      if (response.type === 'FAILURE') {
        if (hasErrorFor(response, ErrorCode.GET_WALLET_NOT_FOUND)) {
          return this.notFound(res, next, response);
        }

        return this.internalServerError(res, next);
      }

      return this.ok(res, next, response);
    })
    .build();
}
