import { LoginRequest, AuthToken } from '@kaizen/auth';
import { apiClient } from '@kaizen/ui';

export const AuthService = {
  login: (request: LoginRequest) => apiClient.post<AuthToken>('/auth', request)
};
