import { ApiResponse, AuthToken, Errors, RefreshToken } from '@kaizen/core';
import { AuthService } from './auth.service';
import { RefreshTokenCommand } from './refresh-token.command';
import { serverEnvironment } from '@kaizen/env-server';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { GetUserService } from '../../../user/server/src/get-user-service';

export class RefreshTokenService extends AuthService {
  private readonly _getUserService: GetUserService;

  constructor() {
    super();
    this._getUserService = new GetUserService();
  }

  public async refreshToken(
    command: RefreshTokenCommand
  ): Promise<ApiResponse<AuthToken>> {
    if (command.token == null || command.token === '') {
      return this.failure(Errors.REFRESH_TOKEN_INVALID);
    }

    try {
      const refreshToken = jwt.verify(
        command.token,
        serverEnvironment.REFRESH_TOKEN_SECRET
      ) as RefreshToken;

      const user = await this._getUserService.get(refreshToken.id);
      if (user == null) {
        throw new Error(
          'Something went wrong. We found a valid token, but no user associated with it.'
        );
      }

      const authToken: AuthToken = {
        accessToken: this.createAccessToken({
          id: user.id,
          email: user.email
        }),
        refreshToken: this.createRefreshToken({
          id: user.id,
          email: user.email
        })
      };
      return this.success(authToken);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return this.failure(Errors.REFRESH_TOKEN_EXPIRED);
      }

      return this.failure(Errors.REFRESH_TOKEN_INVALID);
    }
  }
}
