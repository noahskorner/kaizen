import { Request, Response } from 'express';
import { catchAsync } from '../../middleware/catch-async';
import { Controller } from '../controller';
import { REFRESH_TOKEN_COOKIE_KEY } from './refresh-token-cookie-key';
import { jwtDecode } from 'jwt-decode';
import {
  ILoginService,
  IRefreshTokenService,
  LoginRequest,
  RefreshTokenCommand
} from '@kaizen/auth';
import { IServerEnvironment } from '@kaizen/env-server';

export class AuthController extends Controller {
  constructor(
    private readonly _environment: IServerEnvironment,
    private readonly _loginService: ILoginService,
    private readonly _refreshTokenService: IRefreshTokenService
  ) {
    super();
  }

  public login = catchAsync(async (req: Request, res: Response) => {
    const command: LoginRequest = req.body;

    const response = await this._loginService.login(command);

    if (response.type === 'FAILURE') {
      return this.unauthorized(res, response);
    }

    this.setRefreshToken(res, response.data.refreshToken);
    return this.ok(res, response);
  });

  public refreshToken = catchAsync(async (req: Request, res: Response) => {
    const refreshToken: string = req.cookies?.[REFRESH_TOKEN_COOKIE_KEY];
    const command: RefreshTokenCommand = { token: refreshToken };

    const response = await this._refreshTokenService.refreshToken(command);
    if (response.type === 'FAILURE') {
      return this.unauthorized(res, response);
    }

    this.setRefreshToken(res, response.data.refreshToken);
    return this.ok(res, response);
  });

  public logout = catchAsync(async (req: Request, res: Response) => {
    res.clearCookie(REFRESH_TOKEN_COOKIE_KEY);
    return res.sendStatus(200);
  });

  private setRefreshToken(res: Response, refreshToken: string) {
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

  private getTokenExpirationDate = (token: string) => {
    const { exp } = jwtDecode<{ exp: number }>(token);
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(exp);

    return expirationDate;
  };
}
