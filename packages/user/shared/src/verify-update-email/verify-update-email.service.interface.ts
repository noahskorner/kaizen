import { ServiceResponse } from '@kaizen/core';
import { User } from '../user';
import { VerifyUpdateEmailCommand } from './verify-update-email.command';

export interface IVerifyUpdateEmailService {
  verify(comand: VerifyUpdateEmailCommand): Promise<ServiceResponse<User>>;
}
