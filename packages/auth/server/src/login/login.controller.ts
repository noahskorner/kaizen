import { ILoginService, LoginRequest } from '@kaizen/auth';
import { RequestHandlerBuilder } from '@kaizen/core-server';
import { AuthController } from '../auth.controller';
import { IServerEnvironment } from '@kaizen/env-server';

export class LoginController extends AuthController {
  constructor(
    _environment: IServerEnvironment,
    private readonly _loginService: ILoginService
  ) {
    super(_environment);
  }

  public login = new RequestHandlerBuilder()
    .use(async (req, res, next) => {
      const command = req.body as LoginRequest;
      const response = await this._loginService.login(command);

      if (response.type === 'FAILURE') {
        return this.unauthorized(res, next, response);
      }

      this.setRefreshToken(res, response.data.refreshToken);
      return this.ok(res, next, response);
    })
    .build();
}
