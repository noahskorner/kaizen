import {
  IUpdateTransactionService,
  UpdateTransactionCommand,
  UpdateTransactionRequest
} from '@kaizen/finance';
import {
  AuthenticatedEndpointBuilder,
  Controller,
  Middleware
} from '@kaizen/core-server';
import { ErrorCode, hasErrorFor } from '@kaizen/core';

export class UpdateTransactionController extends Controller {
  constructor(
    private readonly authenticate: Middleware,
    private readonly updateTransactionService: IUpdateTransactionService
  ) {
    super();
  }

  public update = new AuthenticatedEndpointBuilder((req, res, next) =>
    this.authenticate(req, res, next)
  )
    .use(async (req, res, next) => {
      const request = {
        ...(req.body as UpdateTransactionRequest),
        userId: req.user.id
      } satisfies UpdateTransactionCommand;

      const response = await this.updateTransactionService.update(request);

      if (response.type === 'SUCCESS') return this.ok(res, next, response);

      if (hasErrorFor(response, ErrorCode.UPDATE_TRANSACTION_NOT_FOUND))
        return this.notFound(res, next, response);
      if (
        hasErrorFor(response, ErrorCode.UPDATE_TRANSACTION_INVALID_NAME) ||
        hasErrorFor(response, ErrorCode.UPDATE_TRANSACTION_INVALID_AMOUNT) ||
        hasErrorFor(
          response,
          ErrorCode.UPDATE_TRANSACTION_INVALID_MERCHANT_NAME
        ) ||
        hasErrorFor(response, ErrorCode.UPDATE_TRANSACTION_INVALID_DESCRIPTION)
      )
        return this.badRequest(res, next, response);

      return this.internalServerError(res, next, response);
    })
    .build();
}
