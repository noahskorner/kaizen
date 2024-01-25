import { AccessToken, RefreshToken } from '@kaizen/auth';
import { IServerEnvironment } from '@kaizen/env-server';
import { Service } from '@kaizen/core-server';
import jwt from 'jsonwebtoken';

export class AuthService extends Service {
  constructor(protected readonly _environment: IServerEnvironment) {
    super();
  }

  protected createAccessToken(accessToken: AccessToken): string {
    return jwt.sign(accessToken, this._environment.ACCESS_TOKEN_SECRET, {
      expiresIn: this._environment.ACCESS_TOKEN_EXPIRATION
    });
  }

  protected createRefreshToken(refreshToken: RefreshToken): string {
    return jwt.sign(refreshToken, this._environment.REFRESH_TOKEN_SECRET, {
      expiresIn: this._environment.REFRESH_TOKEN_EXPIRATION
    });
  }
}
