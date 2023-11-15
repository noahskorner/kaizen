import { ErrorKey } from './error-key';

export interface ApiError {
  key: ErrorKey;
  message: string;
}
