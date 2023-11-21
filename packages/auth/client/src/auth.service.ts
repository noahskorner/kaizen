import { LoginRequest, AuthToken } from '@kaizen/auth';
import { ApiError, ApiResponse } from '@kaizen/core';
import { apiClient } from '@kaizen/ui';
import { AxiosError } from 'axios';

const AUTHENTICATED_LOCAL_STORAGE_KEY = 'authenticated';

export const authService = {
  isAuthenticated: (): boolean => {
    return localStorage.getItem(AUTHENTICATED_LOCAL_STORAGE_KEY) === 'true';
  },
  login: async (request: LoginRequest): Promise<ApiResponse<AuthToken>> => {
    try {
      const response = await apiClient.post<AuthToken>('/auth', request);

      apiClient.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.accessToken}`;
      localStorage.setItem(AUTHENTICATED_LOCAL_STORAGE_KEY, 'true');

      return { type: 'SUCCESS', data: response.data };
    } catch (e: unknown) {
      const error = e as AxiosError;
      const errors: ApiError[] = (error.response?.data as ApiError[]) ?? [];

      return { type: 'FAILURE', errors: errors };
    }
  },
  logout: async (): Promise<void> => {
    apiClient.delete('/auth');
    delete apiClient.defaults.headers.common['Authorization'];
    localStorage.setItem(AUTHENTICATED_LOCAL_STORAGE_KEY, 'false');

    return Promise.resolve();
  },
  refreshToken: async (): Promise<ApiResponse<AuthToken>> => {
    try {
      const response = await apiClient.get<AuthToken>('/auth');

      apiClient.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.accessToken}`;

      return { type: 'SUCCESS', data: response.data };
    } catch (e: unknown) {
      const error = e as AxiosError;
      const errors: ApiError[] = (error.response?.data as ApiError[]) ?? [];

      return { type: 'FAILURE', errors: errors };
    }
  }
};
