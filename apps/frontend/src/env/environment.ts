/// <reference types="vite/client" />
import { Environment } from './environment.interface';

const NODE_ENV = import.meta.env.VITE_NODE_ENV ?? '';
if (NODE_ENV != 'DEVELOPMENT' && NODE_ENV != 'TEST') {
  throw new Error(
    `Must provide NODE_ENV: ${NODE_ENV}. Did you forget to set it in your environment file?`
  );
}
const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;
if (API_DOMAIN == null) {
  throw new Error(
    `Must provide API_DOMAIN. Did you forget to set it in your environment file?`
  );
}

export const environment: Environment = {
  NODE_ENV: NODE_ENV,
  API_DOMAIN: API_DOMAIN
};
