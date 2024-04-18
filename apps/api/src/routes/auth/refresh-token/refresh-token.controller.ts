import { Request, Response } from 'express';
import { catchAsync } from '../../../middleware/catch-async';
import { REFRESH_TOKEN_COOKIE_KEY } from '../refresh-token-cookie-key';
import { IRefreshTokenService, RefreshTokenCommand } from '@kaizen/auth';
import { AuthController } from '../auth.controller';
import { IServerEnvironment } from '@kaizen/env-server';

export class RefreshTokenController extends AuthController {
  public static readonly route = '/auth';

  constructor(
    _environment: IServerEnvironment,
    private readonly _refreshTokenService: IRefreshTokenService
  ) {
    super(_environment);
  }

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
}
