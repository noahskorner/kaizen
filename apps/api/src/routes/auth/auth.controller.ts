import { Response } from 'express';
import { Controller } from '../controller';
import { REFRESH_TOKEN_COOKIE_KEY } from './refresh-token-cookie-key';
import { jwtDecode } from 'jwt-decode';
import { IServerEnvironment } from '@kaizen/env-server';

export abstract class AuthController extends Controller {
  constructor(private readonly _environment: IServerEnvironment) {
    super();
  }

  protected setRefreshToken(res: Response, refreshToken: string) {
    res.cookie(REFRESH_TOKEN_COOKIE_KEY, refreshToken, {
      domain: 'localhost',
      path: '/',
      secure:
        this._environment.NODE_ENV !== 'TEST' &&
        this._environment.NODE_ENV !== 'DEVELOPMENT',
      httpOnly: true,
      expires: this.getTokenExpirationDate(refreshToken)
    });
  }

  protected getTokenExpirationDate = (token: string) => {
    const { exp } = jwtDecode<{ exp: number }>(token);
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(exp);

    return expirationDate;
  };
}
