import { ApiResponse, Errors } from '@kaizen/core';
import { AuthService } from '../auth.service';
import { RefreshTokenCommand } from './refresh-token.command';
import { serverEnvironment } from '@kaizen/env-server';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { AuthToken, RefreshToken } from '@kaizen/auth';
import { GetUserRepository } from '@kaizen/core-server';

export class RefreshTokenService extends AuthService {
  constructor(private readonly _getUserRepository: GetUserRepository) {
    super();
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

      const user = await this._getUserRepository.get({
        userId: refreshToken.id
      });
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
