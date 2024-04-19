import { Middleware } from './middleware';
import { MiddlewareRequest } from './middleware-request';
import { MiddlewareResponse } from './middleware-response';
import { RequestHandler } from './request-handler';

export class RequestHandlerBuilder {
  private middleware: Middleware[];

  constructor() {
    this.middleware = [];
  }

  public use(middleware: Middleware) {
    this.middleware.push(middleware);
    return this;
  }

  public build(): RequestHandler {
    return (req: MiddlewareRequest) =>
      new Promise((resolve) => {
        let index = 0;
        const res: MiddlewareResponse = {
          sent: false,
          status: 500
        };

        const next = () => {
          // Short-circuit if the response has already been sent
          if (res.sent) {
            resolve(res);
            return;
          }

          // Execute the next middleware
          const middleware = this.middleware[index++];
          if (middleware) {
            middleware(req, res, next);
          } else {
            resolve(res);
          }
        };

        next();
      });
  }
}
