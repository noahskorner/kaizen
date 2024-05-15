import { AccessToken, RefreshToken } from '@kaizen/auth';
import { Service } from '@kaizen/core-server';
import jwt from 'jsonwebtoken';

export class AuthService extends Service {
  constructor(
    protected readonly ACCESS_TOKEN_SECRET: string,
    protected readonly ACCESS_TOKEN_EXPIRATION: string,
    protected readonly REFRESH_TOKEN_SECRET: string,
    protected readonly REFRESH_TOKEN_EXPIRATION: string
  ) {
    super();
  }

  protected createAccessToken(accessToken: AccessToken): string {
    return jwt.sign(accessToken, this.ACCESS_TOKEN_SECRET, {
      expiresIn: this.ACCESS_TOKEN_EXPIRATION
    });
  }

  protected createRefreshToken(refreshToken: RefreshToken): string {
    return jwt.sign(refreshToken, this.REFRESH_TOKEN_SECRET, {
      expiresIn: this.REFRESH_TOKEN_EXPIRATION
    });
  }
}
