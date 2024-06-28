import { CreateUserRequest, ICreateUserService } from '@kaizen/user';
import { Controller, EndpointBuilder } from '@kaizen/core-server';

export class CreateUserController extends Controller {
  constructor(private readonly _createUserService: ICreateUserService) {
    super();
  }

  public create = new EndpointBuilder()
    .use(async (req, res, next) => {
      const request = req.body as CreateUserRequest;
      const response = await this._createUserService.create(request);

      if (response.type === 'FAILURE') {
        return this.badRequest(res, next, response);
      }

      return this.created(res, next, response);
    })
    .build();
}
