import { ServiceResponse } from '@kaizen/core';
import { UpdatePasswordCommand } from './update-password.command';

export interface IUpdatePasswordService {
  update(command: UpdatePasswordCommand): Promise<ServiceResponse<boolean>>;
}
