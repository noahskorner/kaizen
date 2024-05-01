import {
  Controller,
  Middleware,
  RequestHandlerBuilder
} from '@kaizen/core-server';
import { REFRESH_TOKEN_COOKIE_KEY } from '../refresh-token-cookie-key';

export class LogoutController extends Controller {
  constructor(private readonly _authenticate: Middleware) {
    super();
  }

  public logout = new RequestHandlerBuilder()
    .use((req, res, next) => this._authenticate(req, res, next))
    .use(async (_req, res, next) => {
      res.clearCookie(REFRESH_TOKEN_COOKIE_KEY);
      return this.ok(res, next);
    })
    .build();
}
