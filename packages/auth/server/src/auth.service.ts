import { AccessToken, RefreshToken } from '@kaizen/auth';
import { serverEnvironment } from '@kaizen/env-server';
import { Service } from '@kaizen/core';
import jwt from 'jsonwebtoken';

export class AuthService extends Service {
  protected createAccessToken(accessToken: AccessToken): string {
    return jwt.sign(accessToken, serverEnvironment.ACCESS_TOKEN_SECRET, {
      expiresIn: serverEnvironment.ACCESS_TOKEN_EXPIRATION
    });
  }

  protected createRefreshToken(refreshToken: RefreshToken): string {
    return jwt.sign(refreshToken, serverEnvironment.REFRESH_TOKEN_SECRET, {
      expiresIn: serverEnvironment.REFRESH_TOKEN_EXPIRATION
    });
  }
}
