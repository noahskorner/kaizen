import { ApiFailureResponse } from './api-response';
import { ErrorKey } from './error-key';

export const hasErrorFor = (response: ApiFailureResponse, error: ErrorKey) => {
  return response.errors.some((e) => e.key === error);
};
