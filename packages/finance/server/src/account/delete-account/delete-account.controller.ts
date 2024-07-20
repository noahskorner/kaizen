import { ErrorCode, hasErrorFor } from '@kaizen/core';
import {
  AuthenticatedEndpointBuilder,
  Controller,
  Middleware
} from '@kaizen/core-server';
import { DeleteAccountCommand, IDeleteAccountService } from '@kaizen/finance';

export class DeleteAccountController extends Controller {
  constructor(
    private readonly authenticate: Middleware,
    private readonly deleteAccountService: IDeleteAccountService
  ) {
    super();
  }

  public delete = new AuthenticatedEndpointBuilder((req, res, next) =>
    this.authenticate(req, res, next)
  )
    .use(async (req, res, next) => {
      const command: DeleteAccountCommand = {
        accountId: req.params.accountId,
        userId: req.user.id
      };
      const response = await this.deleteAccountService.delete(command);
      if (response.type === 'SUCCESS') return this.ok(res, next, response);

      if (hasErrorFor(response, ErrorCode.DELETE_ACCOUNT_NOT_FOUND)) {
        return this.notFound(res, next, response);
      }

      return this.internalServerError(res, next, response);
    })
    .build();
}
