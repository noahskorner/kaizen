export interface Environment extends Record<string, string> {
  NODE_ENV: 'DEVELOPMENT' | 'TEST' | 'PRODUCTION';
  ACCESS_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRATION: string;
  REFRESH_TOKEN_SECRET: string;
  REFRESH_TOKEN_EXPIRATION: string;
  REFRESH_TOKEN_COOKIE_DOMAIN: string;
  API_PORT: string;
  API_DOMAIN: string;
  FRONTEND_DOMAIN: string;
  PLAID_CLIENT_ID: string;
  PLAID_SECRET: string;
}
