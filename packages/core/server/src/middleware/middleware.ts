import { MiddlewareRequest } from './middleware-request';
import { MiddlewareResponse } from './middleware-response';

export type Middleware = (
  req: MiddlewareRequest,
  res: MiddlewareResponse,
  next: () => void
) => void;
