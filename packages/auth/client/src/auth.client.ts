import { LoginRequest, AuthToken } from '@kaizen/auth';
import { ApiResponse } from '@kaizen/core';
import {
  ApiClient,
  handleAxiosRequest,
  DEFAULT_API_SUCCESS_RESPONSE
} from '@kaizen/core-client';
import { jwtDecode } from 'jwt-decode';

const setAccessToken = (accessToken: string) => {
  ApiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  const { exp } = jwtDecode<{ exp: number }>(accessToken);
  const ms = Math.abs(new Date().getTime() - new Date(exp * 1000).getTime());
  setTimeout(() => {
    console.log('Refreshing token...');
    AuthClient.refreshToken();
  }, ms);
};

export const AuthClient = {
  login: async (request: LoginRequest): Promise<ApiResponse<AuthToken>> => {
    const response = await handleAxiosRequest(() => {
      return ApiClient.post<ApiResponse<AuthToken>>('/auth', request);
    });

    if (response.type === 'FAILURE') {
      return response;
    }

    setAccessToken(response.data.accessToken);
    return response;
  },
  logout: async (): Promise<ApiResponse<null>> => {
    ApiClient.delete<void>('/auth'); // Intentionally not awaiting this request
    delete ApiClient.defaults.headers.common['Authorization'];
    return Promise.resolve(DEFAULT_API_SUCCESS_RESPONSE);
  },
  refreshToken: async (): Promise<ApiResponse<AuthToken>> => {
    const response = await handleAxiosRequest(() => {
      return ApiClient.get<ApiResponse<AuthToken>>('/auth');
    });
    if (response.type === 'FAILURE') return response;

    setAccessToken(response.data.accessToken);
    return response;
  }
};
