import { ServiceResponse } from '@kaizen/core';
import { AuthToken } from '../auth-token';
import { RefreshTokenCommand } from './refresh-token.command';

export interface IRefreshTokenService {
  refreshToken(
    command: RefreshTokenCommand
  ): Promise<ServiceResponse<AuthToken>>;
}
