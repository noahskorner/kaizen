import { REFRESH_TOKEN_COOKIE_KEY } from '../refresh-token-cookie-key';
import { IRefreshTokenService, RefreshTokenCommand } from '@kaizen/auth';
import { AuthController } from '../auth.controller';
import { EndpointBuilder } from '@kaizen/core-server';

export class RefreshTokenController extends AuthController {
  constructor(
    NODE_ENV: string,
    REFRESH_TOKEN_COOKIE_DOMAIN: string,
    private readonly _refreshTokenService: IRefreshTokenService
  ) {
    super(NODE_ENV, REFRESH_TOKEN_COOKIE_DOMAIN);
  }

  public refreshToken = new EndpointBuilder()
    .use(async (req, res, next) => {
      const refreshToken: string = req.cookies[REFRESH_TOKEN_COOKIE_KEY];
      const command: RefreshTokenCommand = { token: refreshToken };

      const response = await this._refreshTokenService.refreshToken(command);
      if (response.type === 'FAILURE') {
        return this.unauthorized(res, next, response);
      }

      this.setRefreshToken(res, response.data.refreshToken);
      return this.ok(res, next, response);
    })
    .build();
}
