import { ErrorCode, hasErrorFor } from '@kaizen/core';
import {
  AuthenticatedEndpointBuilder,
  Controller,
  Middleware
} from '@kaizen/core-server';
import {
  GetExchangeRateCommand,
  GetExchangeRateRequest,
  IGetExchangeRateService
} from '@kaizen/finance';

export class GetExchangeRateController extends Controller {
  constructor(
    private readonly authenticate: Middleware,
    private readonly getExchangeRateService: IGetExchangeRateService
  ) {
    super();
  }

  public get = new AuthenticatedEndpointBuilder((req, res, next) =>
    this.authenticate(req, res, next)
  )
    .use(async (req, res, next) => {
      const request: GetExchangeRateRequest = {
        base: req.params.base
      };

      const response = await this.getExchangeRateService.get(
        request satisfies GetExchangeRateCommand
      );

      if (response.type === 'SUCCESS') {
        return this.ok(res, next, response);
      }

      if (hasErrorFor(response, ErrorCode.GET_EXCHANGE_RATE_INVALID_CURRENCY)) {
        return this.notFound(res, next, response);
      }

      return this.internalServerError(res, next, response);
    })
    .build();
}
