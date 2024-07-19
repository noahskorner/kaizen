import {
  IUpdateEmailService,
  UpdateEmailCommand,
  UpdateEmailRequest
} from '@kaizen/user';
import {
  AuthenticatedEndpointBuilder,
  Controller,
  Middleware
} from '@kaizen/core-server';
import { ErrorCode, ServiceSuccessResponse, hasErrorFor } from '@kaizen/core';

export class UpdateEmailController extends Controller {
  constructor(
    private readonly authenticate: Middleware,
    private readonly updateEmailService: IUpdateEmailService
  ) {
    super();
  }

  public update = new AuthenticatedEndpointBuilder((req, res, next) =>
    this.authenticate(req, res, next)
  )
    .use(async (req, res, next) => {
      const response = await this.updateEmailService.update({
        ...(req.body as UpdateEmailRequest),
        userId: req.user.id
      } satisfies UpdateEmailCommand);

      if (response.type === 'SUCCESS') {
        // Don't send the token back to the client
        const response: ServiceSuccessResponse<boolean> = {
          type: 'SUCCESS',
          data: true
        };
        return this.ok(res, next, response);
      }

      if (
        hasErrorFor(response, ErrorCode.UPDATE_EMAIL_INVALID_EMAIL) ||
        hasErrorFor(response, ErrorCode.UPDATE_EMAIL_ALREADY_IN_USE)
      ) {
        return this.badRequest(res, next, response);
      }

      return this.internalServerError(res, next, response);
    })
    .build();
}
