import { ApiFailureResponse, ErrorKey } from '@kaizen/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const expectError = (res: any, error: ErrorKey) => {
  const response: ApiFailureResponse = res.body;
  expect(response.errors.map((x) => x.key)).toContain(error);
};
