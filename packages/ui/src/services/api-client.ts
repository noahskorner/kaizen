import axios from 'axios';
import { clientEnvironment } from '@kaizen/env-client';

export const ApiClient = axios.create({
  baseURL: clientEnvironment.API_DOMAIN,
  headers: { 'content-type': 'application/json' },
  withCredentials: true
});
