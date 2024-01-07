/// <reference types="vite/client" />

export interface ClientEnvironment {
  NODE_ENV: 'DEVELOPMENT' | 'TEST';
  API_DOMAIN: string;
}

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

export const clientEnvironment: ClientEnvironment = {
  NODE_ENV: NODE_ENV,
  API_DOMAIN: API_DOMAIN
};
