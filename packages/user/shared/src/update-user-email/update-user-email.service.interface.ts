import { ServiceResponse } from '@kaizen/core';
import { UpdateUserEmailCommand } from './update-user-email.command';

export interface IUpdateUserEmailService {
  update(command: UpdateUserEmailCommand): Promise<ServiceResponse<boolean>>;
}
