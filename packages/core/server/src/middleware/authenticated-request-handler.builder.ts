import { Middleware } from './middleware';
import { RequestHandlerBuilder } from './request-handler.builder';

export class AuthenticatedRequestHandlerBuilder extends RequestHandlerBuilder {
  constructor(authenticate: Middleware) {
    super();
    this.middleware.push(authenticate);
  }
}
