import { ApiFailureResponse, ErrorCode } from '@kaizen/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const expectError = (res: any, error: ErrorCode) => {
  const response: ApiFailureResponse = res.body;
  expect(response.errors.map((x) => x.code)).toContain(error);
};
