export interface MiddlewareRequest {
  body: unknown;
  cookies: Record<string, string>;
}
