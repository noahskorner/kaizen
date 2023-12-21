import { ApiFailureResponse, ErrorKey } from '@kaizen/core';

export const hasErrorFor = (response: ApiFailureResponse, error: ErrorKey) => {
  return response.errors.some((e) => e.key === error);
};
