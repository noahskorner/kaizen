import { ServiceResponse, ErrorCode } from '@kaizen/core';
import { AuthService } from '../auth.service';
import { IServerEnvironment } from '@kaizen/env-server';
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
  constructor(
    protected readonly _environment: IServerEnvironment,
    private readonly _getUserRepository: IGetUserRepository
  ) {
    super(_environment);
  }

  public async refreshToken(
    command: RefreshTokenCommand
  ): Promise<ServiceResponse<AuthToken>> {
    if (command.token == null || command.token === '') {
      return this.failure({ code: ErrorCode.REFRESH_TOKEN_INVALID });
    }

    try {
      const refreshToken = jwt.verify(
        command.token,
        this._environment.REFRESH_TOKEN_SECRET
      ) as RefreshToken;

      const user = await this._getUserRepository.get({
        userId: refreshToken.id
      });
      if (user == null) {
        return this.failure({ code: ErrorCode.REFRESH_TOKEN_INVALID });
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
        return this.failure({
          code: ErrorCode.REFRESH_TOKEN_EXPIRED,
          params: {
            expiredAt: error.expiredAt.toISOString()
          }
        });
      }

      return this.failure({ code: ErrorCode.REFRESH_TOKEN_INVALID });
    }
  }
}
