import { ApiResponse } from '../api-response';
import { ErrorKey } from '../error-key';

export const hasErrorFor = <T>(response: ApiResponse<T>, error: ErrorKey) => {
  return (
    response.type === 'FAILURE' && response.errors.some((e) => e.key === error)
  );
};
