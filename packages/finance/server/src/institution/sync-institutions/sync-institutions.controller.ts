import {
  ISyncInstitutionsService,
  SyncInstitutionsCommand
} from '@kaizen/finance';
import {
  AuthenticatedRequestHandlerBuilder,
  Controller,
  Middleware
} from '@kaizen/core-server';

export class SyncInstitutionsController extends Controller {
  constructor(
    private readonly authenticate: Middleware,
    private readonly syncInstitutionsService: ISyncInstitutionsService
  ) {
    super();
  }

  public sync = new AuthenticatedRequestHandlerBuilder((req, res, next) =>
    this.authenticate(req, res, next)
  )
    .use(async (req, res, next) => {
      const command: SyncInstitutionsCommand = {
        userId: req.user.id
      };
      const response = await this.syncInstitutionsService.sync(command);

      if (response.type === 'FAILURE') {
        return this.internalServerError(res, next, response);
      } else return this.ok(res, next, response);
    })
    .build();
}
