import { ApiResponse, Errors } from '@kaizen/core';
import { AuthService } from '../auth.service';
import { serverEnvironment } from '@kaizen/env-server';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import {
  AuthToken,
  RefreshToken,
  IRefreshTokenService,
  RefreshTokenCommand
} from '@kaizen/auth';
import { IGetUserRepository } from '@kaizen/user';

export class RefreshTokenService
  extends AuthService
  implements IRefreshTokenService
{
  constructor(private readonly _getUserRepository: IGetUserRepository) {
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
