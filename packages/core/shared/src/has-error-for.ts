import { ServiceFailureResponse } from './service.response';
import { ErrorCode } from './error-code';

export const hasErrorFor = (
  response: ServiceFailureResponse,
  error: ErrorCode
) => {
  return response.errors.some((e) => e.code === error);
};
