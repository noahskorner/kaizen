import { LoginRequest, AuthToken } from '@kaizen/auth';
import { ApiResponse } from '@kaizen/core';
import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';

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
    const response = await handleAxiosRequest(() => {
      return ApiClient.delete<ApiResponse<null>>('/auth');
    });

    removeAccessTokenHeader();
    return response;
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

const setAccessTokenHeader = (accessToken: string) => {
  ApiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

const removeAccessTokenHeader = () => {
  delete ApiClient.defaults.headers.common['Authorization'];
};
