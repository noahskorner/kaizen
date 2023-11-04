export interface Environment {
  NODE_ENV: 'DEVELOPMENT' | 'TEST';
  DATABASE_URL: string;
  ACCESS_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRATION: string;
  REFRESH_TOKEN_SECRET: string;
  REFRESH_TOKEN_EXPIRATION: string;
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

export const environment: Environment = {
  NODE_ENV: NODE_ENV,
  DATABASE_URL: DATABASE_URL,
  ACCESS_TOKEN_SECRET: ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION: ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_SECRET: REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRATION: REFRESH_TOKEN_EXPIRATION
};
