import { Environment } from './environment.interface';

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

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (OPENAI_API_KEY == null) {
  throw new Error(
    `Must provide OPENAI_API_KEY. Did you forget to set it in your environment file?`
  );
}

const UPDATE_EMAIL_SECRET = process.env.UPDATE_EMAIL_SECRET;
if (UPDATE_EMAIL_SECRET == null) {
  throw new Error(
    `Must provide UPDATE_EMAIL_SECRET. Did you forget to set it in your environment file?`
  );
}

const UPDATE_EMAIL_EXPIRATION = process.env.UPDATE_EMAIL_EXPIRATION;
if (UPDATE_EMAIL_EXPIRATION == null) {
  throw new Error(
    `Must provide UPDATE_EMAIL_EXPIRATION. Did you forget to set it in your environment file?`
  );
}

const FORGOT_PASSWORD_SECRET = process.env.FORGOT_PASSWORD_SECRET;
if (FORGOT_PASSWORD_SECRET == null) {
  throw new Error(
    `Must provide FORGOT_PASSWORD_SECRET. Did you forget to set it in your environment file?`
  );
}

const FORGOT_PASSWORD_EXPIRATION = process.env.FORGOT_PASSWORD_EXPIRATION;
if (FORGOT_PASSWORD_EXPIRATION == null) {
  throw new Error(
    `Must provide FORGOT_PASSWORD_EXPIRATION. Did you forget to set it in your environment file?`
  );
}

const OPEN_EXCHANGE_RATE_APP_ID = process.env.OPEN_EXCHANGE_RATE_APP_ID;
if (OPEN_EXCHANGE_RATE_APP_ID == null) {
  throw new Error(
    `Must provide OPEN_EXCHANGE_RATE_APP_ID. Did you forget to set it in your environment file?`
  );
}

export const environment: Environment = {
  NODE_ENV: NODE_ENV,
  ACCESS_TOKEN_SECRET: ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION: ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_SECRET: REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRATION: REFRESH_TOKEN_EXPIRATION,
  UPDATE_EMAIL_SECRET: UPDATE_EMAIL_SECRET,
  UPDATE_EMAIL_EXPIRATION: UPDATE_EMAIL_EXPIRATION,
  FORGOT_PASSWORD_SECRET: FORGOT_PASSWORD_SECRET,
  FORGOT_PASSWORD_EXPIRATION: FORGOT_PASSWORD_EXPIRATION,
  API_PORT: API_PORT,
  API_DOMAIN: API_DOMAIN,
  FRONTEND_DOMAIN: FRONTEND_DOMAIN,
  REFRESH_TOKEN_COOKIE_DOMAIN: REFRESH_TOKEN_COOKIE_DOMAIN,
  PLAID_CLIENT_ID: PLAID_CLIENT_ID,
  PLAID_SECRET: PLAID_SECRET,
  OPENAI_API_KEY: OPENAI_API_KEY,
  AWS_REGION: process.env.AWS_REGION ?? null,
  AWS_DATABASE_SECRET_ID: process.env.AWS_DATABASE_SECRET_ID ?? null,
  AWS_DATABASE_WHITELIST: JSON.parse(
    process.env.AWS_DATABASE_WHITELIST ?? '[]'
  ),
  OPEN_EXCHANGE_RATE_APP_ID: OPEN_EXCHANGE_RATE_APP_ID
};
