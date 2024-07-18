import { ServiceResponse } from '@kaizen/core';
import { UpdateEmailCommand } from './update-email.command';
import { UpdateEmailResponse } from './update-email-response';

export interface IUpdateEmailService {
  update(
    command: UpdateEmailCommand
  ): Promise<ServiceResponse<UpdateEmailResponse>>;
}
