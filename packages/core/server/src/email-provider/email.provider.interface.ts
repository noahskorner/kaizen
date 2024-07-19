import { ServiceResponse } from '@kaizen/core';
import { SendEmailCommand } from './send-email-command';

export interface IEmailProvider {
  sendEmail(command: SendEmailCommand): Promise<ServiceResponse<boolean>>;
}
