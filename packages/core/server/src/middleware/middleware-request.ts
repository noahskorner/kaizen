import { Readable } from 'stream';

export interface MiddlewareRequest {
  // consider just making this 'authentication'
  headers: Record<string, string>;
  // consider just making this generic
  cookies: Record<string, string>;
  // TODO: Add generic type
  params: Record<string, string>;
  query: Record<string, string>;
  body: unknown;
  stream: Readable;
  user: {
    id: string;
    email: string;
  };
}
