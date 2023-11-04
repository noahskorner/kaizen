import { AuthToken } from '@kaizen/core';
import { ApiResponse } from '../../api-response';
import { Errors } from '../../errors';
import { AuthService } from './auth.service';
import { RefreshTokenCommand } from './refresh-token.command';

export class RefreshTokenService extends AuthService {
  public async refreshToken(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    command: RefreshTokenCommand
  ): Promise<ApiResponse<AuthToken>> {
    return this.failure(Errors.REFRESH_TOKEN_INVALID);
  }
}
