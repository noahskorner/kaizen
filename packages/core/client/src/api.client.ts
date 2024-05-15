/// <reference types="vite/client" />

import axios from 'axios';

export const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN, // TODO: This should use the frontend/src/env/environment.ts file via DI
  headers: { 'content-type': 'application/json' },
  withCredentials: true
});
