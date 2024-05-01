import { CreateLinkTokenRequest, ICreateLinkTokenService } from '@kaizen/user';
import { ErrorCode, hasErrorFor } from '@kaizen/core';
import {
  AuthenticatedRequestHandlerBuilder,
  Controller,
  Middleware
} from '@kaizen/core-server';

export class CreateLinkTokenController extends Controller {
  constructor(
    private readonly _authenticate: Middleware,
    private readonly _createLinkTokenService: ICreateLinkTokenService
  ) {
    super();
  }

  public createLinkToken = new AuthenticatedRequestHandlerBuilder(
    (req, res, next) => this._authenticate(req, res, next)
  )
    .use(async (req, res, next) => {
      const request: CreateLinkTokenRequest = {
        userId: req.user.id
      };
      const response = await this._createLinkTokenService.create(request);

      if (response.type === 'FAILURE') {
        if (hasErrorFor(response, ErrorCode.CREATE_LINK_TOKEN_USER_NOT_FOUND)) {
          return this.badRequest(res, next, response);
        } else return this.internalServerError(res, next, response);
      }

      return this.created(res, next, response);
    })
    .build();
}
