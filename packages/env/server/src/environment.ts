export interface IServerEnvironment extends Record<string, string> {
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

const NODE_ENV = process.env.NODE_ENV ?? '';
if (
  NODE_ENV != 'DEVELOPMENT' &&
  NODE_ENV != 'TEST' &&
  NODE_ENV != 'PRODUCTION'
) {
  throw new Error(
    `Must provide NODE_ENV: ${NODE_ENV}. Did you forget to set it in your environment file?`
  );
}
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
if (ACCESS_TOKEN_SECRET == null) {
  throw new Error(
    `Must provide ACCESS_TOKEN_SECRET. Did you forget to set it in your environment file?`
  );
}
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;
if (ACCESS_TOKEN_EXPIRATION == null) {
  throw new Error(
    `Must provide ACCESS_TOKEN_EXPIRATION. Did you forget to set it in your environment file?`
  );
}
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
if (REFRESH_TOKEN_SECRET == null) {
  throw new Error(
    `Must provide REFRESH_TOKEN_SECRET. Did you forget to set it in your environment file?`
  );
}
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION;
if (REFRESH_TOKEN_EXPIRATION == null) {
  throw new Error(
    `Must provide REFRESH_TOKEN_EXPIRATION. Did you forget to set it in your environment file?`
  );
}
const API_PORT = process.env.API_PORT;
if (API_PORT == null || isNaN(parseInt(process.env.API_PORT ?? ''))) {
  throw new Error(
    `Must provide API_PORT. Did you forget to set it in your environment file?`
  );
}
const API_DOMAIN = process.env.API_DOMAIN;
if (API_DOMAIN == null) {
  throw new Error(
    `Must provide API_DOMAIN. Did you forget to set it in your environment file?`
  );
}

const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN;
if (FRONTEND_DOMAIN == null) {
  throw new Error(
    `Must provide FRONTEND_DOMAIN. Did you forget to set it in your environment file?`
  );
}
const REFRESH_TOKEN_COOKIE_DOMAIN = process.env.REFRESH_TOKEN_COOKIE_DOMAIN;
if (REFRESH_TOKEN_COOKIE_DOMAIN == null) {
  throw new Error(
    `Must provide REFRESH_TOKEN_COOKIE_DOMAIN. Did you forget to set it in your environment file?`
  );
}
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
if (PLAID_CLIENT_ID == null) {
  throw new Error(
    `Must provide PLAID_CLIENT_ID. Did you forget to set it in your environment file?`
  );
}
const PLAID_SECRET = process.env.PLAID_SECRET;
if (PLAID_SECRET == null) {
  throw new Error(
    `Must provide PLAID_SECRET. Did you forget to set it in your environment file?`
  );
}

export const serverEnvironment: IServerEnvironment = {
  NODE_ENV: NODE_ENV,
  ACCESS_TOKEN_SECRET: ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION: ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_SECRET: REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRATION: REFRESH_TOKEN_EXPIRATION,
  API_PORT: API_PORT,
  API_DOMAIN: API_DOMAIN,
  FRONTEND_DOMAIN: FRONTEND_DOMAIN,
  REFRESH_TOKEN_COOKIE_DOMAIN: REFRESH_TOKEN_COOKIE_DOMAIN,
  PLAID_CLIENT_ID: PLAID_CLIENT_ID,
  PLAID_SECRET: PLAID_SECRET
};
