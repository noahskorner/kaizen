import axios from 'axios';
import { clientEnvironment } from '@kaizen/env-client';

export const apiClient = axios.create({
  baseURL: clientEnvironment.API_DOMAIN,
  headers: { 'content-type': 'application/json' }
});
