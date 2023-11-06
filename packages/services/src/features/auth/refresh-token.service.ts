import { AuthToken, RefreshToken } from '@kaizen/core';
import { ApiResponse } from '../../api-response';
import { Errors } from '../../errors';
import { AuthService } from './auth.service';
import { RefreshTokenCommand } from './refresh-token.command';
import { environment } from '@kaizen/env';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

export class RefreshTokenService extends AuthService {
  public async refreshToken(
    command: RefreshTokenCommand
  ): Promise<ApiResponse<AuthToken>> {
    if (command.token == null || command.token === '') {
      return this.failure(Errors.REFRESH_TOKEN_INVALID);
    }

    try {
      const refreshToken = jwt.verify(
        command.token,
        environment.REFRESH_TOKEN_SECRET
      ) as RefreshToken;
      console.log(refreshToken);
      throw new Error('Method not implemented.');
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return this.failure(Errors.REFRESH_TOKEN_EXPIRED);
      }

      return this.failure(Errors.REFRESH_TOKEN_INVALID);
    }
  }
}
