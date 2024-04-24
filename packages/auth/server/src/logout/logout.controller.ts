import { Controller, RequestHandlerBuilder } from '@kaizen/core-server';
import { REFRESH_TOKEN_COOKIE_KEY } from '../refresh-token-cookie-key';

export class LogoutController extends Controller {
  public logout = new RequestHandlerBuilder()
    .use(async (_req, res, next) => {
      if (res.clearCookie == null) {
        res.clearCookie = [];
      }

      res.clearCookie.push(REFRESH_TOKEN_COOKIE_KEY);
      return this.ok(res, next);
    })
    .build();
}
