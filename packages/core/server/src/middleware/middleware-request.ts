export interface MiddlewareRequest {
  headers: Record<string, string>;
  cookies: Record<string, string>;
  body: unknown;
  // TODO: How can I create a discriminated union type for this?
  // export type MiddlewareRequest = AuthenticatedMiddlewareRequest | UnauthenticatedMiddlewareRequest;
  user?: {
    id: string;
    email: string;
  };
}
