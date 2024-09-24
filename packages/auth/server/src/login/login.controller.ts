import { ILoginService, LoginRequest } from '@kaizen/auth';
import { EndpointBuilder } from '@kaizen/core-server';
import { AuthController } from '../auth.controller';

export class LoginController extends AuthController {
  constructor(
    NODE_ENV: string,
    REFRESH_TOKEN_COOKIE_DOMAIN: string,
    private readonly _loginService: ILoginService
  ) {
    super(NODE_ENV, REFRESH_TOKEN_COOKIE_DOMAIN);
  }

  public login = new EndpointBuilder()
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
