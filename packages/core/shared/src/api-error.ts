import { ErrorCode } from './error-code';

export interface ApiError {
  code: ErrorCode;
  message: string;
}
