import { ApiFailureResponse, ErrorCode } from '@kaizen/core';
import { Middleware } from './middleware';
import { MiddlewareRequest } from './middleware-request';
import { MiddlewareResponse } from './middleware-response';
import { Endpoint } from './endpoint';

export class EndpointBuilder {
  protected middleware: Middleware[];

  constructor() {
    this.middleware = [];
  }

  public use(middleware: Middleware) {
    this.middleware.push(middleware);
    return this;
  }

  public build(): Endpoint {
    return (req: MiddlewareRequest) =>
      new Promise((resolve) => {
        let index = 0;
        const res = new MiddlewareResponse();

        const next = async () => {
          // Short-circuit if the response has already been sent
          if (res._sent) {
            resolve(res);
            return;
          }

          // Execute the next middleware
          const middleware = this.middleware[index++];
          if (middleware) {
            try {
              await middleware(req, res, next);
            } catch (error) {
              console.error(error);
              res.send(500, {
                type: 'FAILURE',
                errors: [
                  {
                    code: ErrorCode.INTERNAL_SERVER_ERROR,
                    message: JSON.stringify(error)
                  }
                ]
              } satisfies ApiFailureResponse);
              resolve(res);
            }
          } else {
            resolve(res);
          }
        };

        next();
      });
  }
}
