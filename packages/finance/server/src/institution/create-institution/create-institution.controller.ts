import {
  CreateInstitutionCommand,
  CreateInstitutionRequest,
  ICreateInstitutionService
} from '@kaizen/finance';
import { ErrorCode, hasErrorFor } from '@kaizen/core';
import {
  AuthenticatedEndpointBuilder,
  Controller,
  Middleware
} from '@kaizen/core-server';

export class CreateInstitutionController extends Controller {
  constructor(
    private readonly authenticate: Middleware,
    private readonly createInstitutionService: ICreateInstitutionService
  ) {
    super();
  }

  public create = new AuthenticatedEndpointBuilder((req, res, next) =>
    this.authenticate(req, res, next)
  )
    .use(async (req, res, next) => {
      const request = req.body as CreateInstitutionRequest;
      const command: CreateInstitutionCommand = {
        userId: req.user.id,
        ...request
      };
      const response = await this.createInstitutionService.create(command);

      if (response.type === 'FAILURE') {
        if (
          hasErrorFor(
            response,
            ErrorCode.CREATE_ACCOUNT_INVALID_PLAID_PUBLIC_TOKEN
          )
        ) {
          return this.badRequest(res, next, response);
        } else return this.internalServerError(res, next, response);
      }

      return this.created(res, next, response);
    })
    .build();
}
