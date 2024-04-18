import { Request, Response } from 'express';
import { catchAsync } from '../../../middleware/catch-async';
import { Controller } from '../../controller';
import { REFRESH_TOKEN_COOKIE_KEY } from '../refresh-token-cookie-key';

export class LogoutController extends Controller {
  public static readonly route = '/auth';

  constructor() {
    super();
  }

  public logout = catchAsync(async (req: Request, res: Response) => {
    res.clearCookie(REFRESH_TOKEN_COOKIE_KEY);
    return res.sendStatus(200);
  });
}
