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

      if (response.type === 'FAILURE') {
        return this.internalServerError(res, next, response);
      }

      return this.ok(res, next, response);
    })
    .build();
}
