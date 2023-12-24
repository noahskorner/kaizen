import { AuthToken } from '../auth-token';
import { LoginCommand } from './login.command';
import { ApiResponse } from '@kaizen/core';

export interface ILoginService {
  login(command: LoginCommand): Promise<ApiResponse<AuthToken>>;
}
