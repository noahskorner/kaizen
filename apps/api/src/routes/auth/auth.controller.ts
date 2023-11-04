import {
  LoginCommand,
  LoginService,
  RefreshTokenCommand,
  RefreshTokenService
} from '@kaizen/services';
import { Request, Response } from 'express';
import { catchAsync } from '../../middleware/catch-async';
import { Controller } from '../controller';
import { REFRESH_TOKEN_COOKIE_KEY } from './refresh-token-cookie-key';
import { jwtDecode } from 'jwt-decode';

export class AuthController extends Controller {
  private readonly _loginService: LoginService;
  private readonly refreshTokenService: RefreshTokenService;

  constructor() {
    super();
    this._loginService = new LoginService();
    this.refreshTokenService = new RefreshTokenService();
  }

  public login = catchAsync(async (req: Request, res: Response) => {
    const command: LoginCommand = req.body;

    const response = await this._loginService.login(command);

    if (response.type === 'FAILURE') {
      return this.unauthorized(res, response);
    }

    res.cookie(REFRESH_TOKEN_COOKIE_KEY, response.data.refreshToken, {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      expires: this.getTokenExpirationDate(response.data.refreshToken)
    });
    return this.ok(res, response);
  });

  public refreshToken = catchAsync(async (req: Request, res: Response) => {
    const refreshToken: string = req.cookies?.[REFRESH_TOKEN_COOKIE_KEY];
    const command: RefreshTokenCommand = { token: refreshToken };

    const response = await this.refreshTokenService.refreshToken(command);
    if (response.type === 'FAILURE') {
      return this.unauthorized(res, response);
    }

    return this.ok(res);
  });

  private getTokenExpirationDate = (token: string) => {
    const { exp } = jwtDecode<{ exp: number }>(token);
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(exp);

    return expirationDate;
  };
}
