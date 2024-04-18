import { Request, Response } from 'express';
import { catchAsync } from '../../../middleware/catch-async';
import { ILoginService, LoginRequest } from '@kaizen/auth';
import { IServerEnvironment } from '@kaizen/env-server';
import { AuthController } from '../auth.controller';

export class LoginController extends AuthController {
  public static readonly route = '/auth';

  constructor(
    _environment: IServerEnvironment,
    private readonly _loginService: ILoginService
  ) {
    super(_environment);
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
}
