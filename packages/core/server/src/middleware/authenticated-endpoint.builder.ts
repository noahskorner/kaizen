import { Middleware } from './middleware';
import { EndpointBuilder } from './endpoint.builder';

export class AuthenticatedEndpointBuilder extends EndpointBuilder {
  constructor(authenticate: Middleware) {
    super();
    this.middleware.push(authenticate);
  }
}
