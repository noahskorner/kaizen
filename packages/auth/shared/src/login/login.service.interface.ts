import { AuthToken } from '../auth-token';
import { LoginCommand } from './login.command';
import { ServiceResponse } from '@kaizen/core';

export interface ILoginService {
  login(command: LoginCommand): Promise<ServiceResponse<AuthToken>>;
}
