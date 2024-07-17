import { UpdatePasswordCommand, UpdatePasswordRequest } from '@kaizen/user';
import {
  AuthenticatedEndpointBuilder,
  Controller,
  Middleware
} from '@kaizen/core-server';
import { UpdatePasswordService } from './update-password.service';

export class UpdatePasswordController extends Controller {
  constructor(
    private readonly authenticate: Middleware,
    private readonly updatePasswordService: UpdatePasswordService
  ) {
    super();
  }

  public update = new AuthenticatedEndpointBuilder((req, res, next) =>
    this.authenticate(req, res, next)
  )
    .use(async (req, res, next) => {
      const command: UpdatePasswordCommand = {
        ...(req.body as UpdatePasswordRequest),
        userId: req.user.id
      };

      const response = await this.updatePasswordService.update(command);

      if (response.type === 'FAILURE')
        return this.badRequest(res, next, response);

      return this.ok(res, next, response);
    })

    .build();
}
