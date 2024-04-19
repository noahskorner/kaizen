import { MiddlewareRequest } from './middleware-request';
import { MiddlewareResponse } from './middleware-response';

export type RequestHandler = (
  req: MiddlewareRequest
) => Promise<MiddlewareResponse>;
