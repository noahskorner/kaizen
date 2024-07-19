import {
  IVerifyUpdateEmailService,
  VerifyUpdateEmailCommand,
  VerifyUpdateEmailRequest
} from '@kaizen/user';
import { Controller, EndpointBuilder } from '@kaizen/core-server';
import { ErrorCode, hasErrorFor } from '@kaizen/core';

export class VerifyUpdateEmailController extends Controller {
  constructor(
    private readonly verifyUpdateEmailService: IVerifyUpdateEmailService
  ) {
    super();
  }

  public verify = new EndpointBuilder()
    .use(async (req, res, next) => {
      const response = await this.verifyUpdateEmailService.verify({
        ...(req.body as VerifyUpdateEmailRequest)
      } satisfies VerifyUpdateEmailCommand);

      if (response.type === 'SUCCESS') return this.ok(res, next, response);

      if (
        hasErrorFor(response, ErrorCode.VERIFY_UPDATE_EMAIL_TOKEN_NOT_PROVIDED)
      ) {
        return this.badRequest(res, next, response);
      }
      if (
        hasErrorFor(response, ErrorCode.VERIFY_UPDATE_EMAIL_TOKEN_NOT_VALID)
      ) {
        return this.unauthorized(res, next, response);
      }

      return this.internalServerError(res, next, response);
    })
    .build();
}
