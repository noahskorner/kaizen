import { AxiosResponse } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockAxiosHeaders: any = {};

export const mockAxiosSuccessResponse: Omit<
  AxiosResponse<unknown, unknown>,
  'data'
> = {
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {
    headers: mockAxiosHeaders
  }
};
