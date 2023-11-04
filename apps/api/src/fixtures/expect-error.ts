import { ErrorKey, ApiError } from '@kaizen/services';

export const expectError = (response: any, error: ErrorKey) => {
  const errors: ApiError[] = response.body;
  expect(errors.map((x) => x.key)).toContain(error);
};
