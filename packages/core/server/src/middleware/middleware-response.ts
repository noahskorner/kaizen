export interface MiddlewareResponse {
  sent: boolean;
  status: number;
  body?: unknown;
}
