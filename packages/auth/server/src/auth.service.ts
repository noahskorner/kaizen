import { AccessToken, RefreshToken } from '@kaizen/core';
import { environment } from '@kaizen/env';
import { Service } from '@kaizen/core';
import jwt from 'jsonwebtoken';

export class AuthService extends Service {
  protected createAccessToken(accessToken: AccessToken): string {
    return jwt.sign(accessToken, environment.ACCESS_TOKEN_SECRET, {
      expiresIn: environment.ACCESS_TOKEN_EXPIRATION
    });
  }

  protected createRefreshToken(refreshToken: RefreshToken): string {
    return jwt.sign(refreshToken, environment.REFRESH_TOKEN_SECRET, {
      expiresIn: environment.REFRESH_TOKEN_EXPIRATION
    });
  }
}
