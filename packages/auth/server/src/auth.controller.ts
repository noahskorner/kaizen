import { jwtDecode } from 'jwt-decode';
import { Controller, Cookie, MiddlewareResponse } from '@kaizen/core-server';
import { REFRESH_TOKEN_COOKIE_KEY } from './refresh-token-cookie-key';

export abstract class AuthController extends Controller {
  constructor(protected readonly NODE_ENV: string) {
    super();
  }

  protected setRefreshToken(res: MiddlewareResponse, refreshToken: string) {
    res.setCookie({
      key: REFRESH_TOKEN_COOKIE_KEY,
      value: refreshToken,
      domain: 'localhost',
      path: '/',
      secure: this.NODE_ENV !== 'TEST' && this.NODE_ENV !== 'DEVELOPMENT',
      httpOnly: true,
      expires: this.getTokenExpirationDate(refreshToken)
    } satisfies Cookie);
  }

  protected getTokenExpirationDate = (token: string) => {
    const { exp } = jwtDecode<{ exp: number }>(token);
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(exp);

    return expirationDate;
  };
}
