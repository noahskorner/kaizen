import { ApiError, ErrorKey } from '@kaizen/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const expectError = (response: any, error: ErrorKey) => {
  const errors: ApiError[] = response.body;
  expect(errors.map((x) => x.key)).toContain(error);
};
