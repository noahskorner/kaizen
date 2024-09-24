import { Controller, Middleware, EndpointBuilder } from '@kaizen/core-server';
import { REFRESH_TOKEN_COOKIE_KEY } from '../refresh-token-cookie-key';

export class LogoutController extends Controller {
  constructor(
    private readonly authenticate: Middleware,
    private readonly REFRESH_TOKEN_COOKIE_DOMAIN: string
  ) {
    super();
  }

  public logout = new EndpointBuilder()
    .use((req, res, next) => this.authenticate(req, res, next))
    .use(async (_req, res, next) => {
      res.clearCookie({
        key: REFRESH_TOKEN_COOKIE_KEY,
        domain: this.REFRESH_TOKEN_COOKIE_DOMAIN
      });
      return this.ok(res, next);
    })
    .build();
}
