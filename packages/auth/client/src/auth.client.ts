import { LoginRequest, AuthToken } from '@kaizen/auth';
import { ApiResponse } from '@kaizen/core';
import {
  ApiClient,
  handleAxiosRequest,
  DEFAULT_API_SUCCESS_RESPONSE
} from '@kaizen/core-client';

export const AuthClient = {
  login: async (request: LoginRequest): Promise<ApiResponse<AuthToken>> => {
    const response = await handleAxiosRequest(() => {
      return ApiClient.post<ApiResponse<AuthToken>>('/auth', request);
    });

    if (response.type === 'FAILURE') {
      return response;
    }

    setAccessTokenHeader(response.data.accessToken);
    return response;
  },
  logout: async (): Promise<ApiResponse<null>> => {
    removeAccessTokenHeader();
    ApiClient.delete<void>('/auth'); // Intentionally not awaiting this request
    return Promise.resolve(DEFAULT_API_SUCCESS_RESPONSE);
  },
  refreshToken: async (): Promise<ApiResponse<AuthToken>> => {
    const response = await handleAxiosRequest(() => {
      return ApiClient.get<ApiResponse<AuthToken>>('/auth');
    });
    if (response.type === 'FAILURE') return response;

    setAccessTokenHeader(response.data.accessToken);
    return response;
  }
};

// TODO: Move this to a secure cookie instead of a header
const setAccessTokenHeader = (accessToken: string) => {
  ApiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

const removeAccessTokenHeader = () => {
  delete ApiClient.defaults.headers.common['Authorization'];
};
