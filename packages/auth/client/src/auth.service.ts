import { LoginRequest, AuthToken } from '@kaizen/auth';
import { ApiError, ApiResponse } from '@kaizen/core';
import { apiClient } from '@kaizen/ui';
import { AxiosError } from 'axios';

export const authService = {
  login: async (request: LoginRequest): Promise<ApiResponse<AuthToken>> => {
    try {
      const response = await apiClient.post<AuthToken>('/auth', request);

      apiClient.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.accessToken}`;

      return { type: 'SUCCESS', data: response.data };
    } catch (e: unknown) {
      const error = e as AxiosError;
      const errors: ApiError[] = (error.response?.data as ApiError[]) ?? [];

      return { type: 'FAILURE', errors: errors };
    }
  },
  logout: async () => {
    apiClient.delete('/auth');
    delete apiClient.defaults.headers.common['Authorization'];

    return Promise.resolve();
  }
};
