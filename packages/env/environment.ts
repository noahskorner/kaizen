export interface Environment {
  NODE_ENV: 'DEVELOPMENT';
  DATABASE_URL: string;
}

const NODE_ENV = process.env.NODE_ENV ?? '';
if (NODE_ENV != 'DEVELOPMENT') {
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

export const environment: Environment = {
  NODE_ENV: NODE_ENV,
  DATABASE_URL: DATABASE_URL
};
