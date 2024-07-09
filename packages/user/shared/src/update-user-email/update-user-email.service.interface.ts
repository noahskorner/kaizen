import { ServiceResponse } from '@kaizen/core';
import { UpdateUserEmailCommand } from './update-user-email.command';
import { UpdateUserEmailResponse } from './update-user-email.response';

export interface IUpdateUserEmailService {
  update(
    command: UpdateUserEmailCommand
  ): Promise<ServiceResponse<UpdateUserEmailResponse>>;
}
