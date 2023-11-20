export interface ServerEnvironment {
  NODE_ENV: 'DEVELOPMENT' | 'TEST';
  DATABASE_URL: string;
  ACCESS_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRATION: string;
  REFRESH_TOKEN_SECRET: string;
  REFRESH_TOKEN_EXPIRATION: string;
  API_PORT: number;
  API_DOMAIN: string;
  FRONTEND_DOMAIN: string;
}

const NODE_ENV = process.env.NODE_ENV ?? '';
if (NODE_ENV != 'DEVELOPMENT' && NODE_ENV != 'TEST') {
  throw new Error(
    `Must provide NODE_ENV: ${NODE_ENV}. Did you forget to set it in your environment file?`
  );
}
const DATABASE_URL = process.env.DATABASE_URL;
if (DATABASE_URL == null) {
  throw new Error(
    `Must provide DATABASE_URL. Did you forget to set it in your environment file?`
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
const API_PORT = parseInt(process.env.API_PORT ?? '');
if (API_PORT == null || isNaN(API_PORT)) {
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

export const serverEnvironment: ServerEnvironment = {
  NODE_ENV: NODE_ENV,
  DATABASE_URL: DATABASE_URL,
  ACCESS_TOKEN_SECRET: ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION: ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_SECRET: REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRATION: REFRESH_TOKEN_EXPIRATION,
  API_PORT: API_PORT,
  API_DOMAIN: API_DOMAIN,
  FRONTEND_DOMAIN: FRONTEND_DOMAIN
};
