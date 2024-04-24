export interface Cookie {
  key: string;
  value: string;
  domain?: string;
  path?: string;
  expires?: Date;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: boolean | 'lax' | 'strict' | 'none';
}

export interface MiddlewareResponse {
  sent: boolean;
  status: number;
  body?: unknown;
  cookie?: Cookie[];
  clearCookie?: string[];
}
