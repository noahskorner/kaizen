import {
  AuthenticatedEndpointBuilder,
  Controller,
  Middleware
} from '@kaizen/core-server';
import {
  FindInstitutionsCommand,
  IFindInstitutionsService
} from '@kaizen/finance';

export class FindInstitutionsController extends Controller {
  constructor(
    private readonly authenticate: Middleware,
    private readonly findInstitutionsService: IFindInstitutionsService
  ) {
    super();
  }

  public find = new AuthenticatedEndpointBuilder((req, res, next) =>
    this.authenticate(req, res, next)
  )
    .use(async (req, res, next) => {
      const command: FindInstitutionsCommand = {
        userId: req.user.id
      };
      const response = await this.findInstitutionsService.find(command);

      if (response.type === 'FAILURE') {
        return this.internalServerError(res, next, response);
      } else return this.ok(res, next, response);
    })
    .build();
}
