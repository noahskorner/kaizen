import { IEmailProvider } from './email.provider.interface';
import { SendEmailCommand } from './send-email-command';
import { Service } from '../service';
import { ServiceResponse } from '@kaizen/core';

export class LocalEmailProvider extends Service implements IEmailProvider {
  public async sendEmail(
    command: SendEmailCommand
  ): Promise<ServiceResponse<boolean>> {
    console.log(command);

    return Promise.resolve(this.success(true));
  }
}
