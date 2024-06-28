import { MiddlewareRequest } from './middleware-request';
import { MiddlewareResponse } from './middleware-response';

export type Endpoint = (req: MiddlewareRequest) => Promise<MiddlewareResponse>;
