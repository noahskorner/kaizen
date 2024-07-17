import { ServiceResponse } from '@kaizen/core';
import { ForgotPasswordCommand } from './forgot-password.command';

export interface IForgotPasswordService {
  forgot(command: ForgotPasswordCommand): Promise<ServiceResponse<boolean>>;
}
