import {
  IUpdateUserEmailService,
  UpdateUserEmailCommand,
  UpdateUserEmailRequest
} from '@kaizen/user';
import {
  AuthenticatedEndpointBuilder,
  Controller,
  Middleware
} from '@kaizen/core-server';
import { ErrorCode, hasErrorFor } from '@kaizen/core';

export class UpdateUserEmailController extends Controller {
  constructor(
    private readonly authenticate: Middleware,
    private readonly updateUserEmailService: IUpdateUserEmailService
  ) {
    super();
  }

  public update = new AuthenticatedEndpointBuilder((req, res, next) =>
    this.authenticate(req, res, next)
  )
    .use(async (req, res, next) => {
      const response = await this.updateUserEmailService.update({
        ...(req.body as UpdateUserEmailRequest),
        userId: req.user.id
      } satisfies UpdateUserEmailCommand);

      if (response.type === 'SUCCESS') return this.ok(res, next, response);

      if (
        hasErrorFor(response, ErrorCode.UPDATE_USER_EMAIL_INVALID_EMAIL) ||
        hasErrorFor(response, ErrorCode.UPDATE_USER_EMAIL_ALREADY_IN_USE)
      ) {
        return this.badRequest(res, next, response);
      }

      return this.internalServerError(res, next, response);
    })
    .build();
}
