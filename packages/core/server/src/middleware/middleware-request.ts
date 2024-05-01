export interface MiddlewareRequest {
  headers: Record<string, string>;
  cookies: Record<string, string>;
  body: unknown;
  user: {
    id: string;
    email: string;
  };
}
