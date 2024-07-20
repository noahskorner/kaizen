import { ServiceResponse } from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  CreateUserValidator,
  IUpdatePasswordRepository,
  IUpdatePasswordService,
  UpdatePasswordCommand,
  UpdatePasswordQuery
} from '@kaizen/user';
import { CreateUserService } from '../create-user';

export class UpdatePasswordService
  extends Service
  implements IUpdatePasswordService
{
  constructor(
    private readonly updatePasswordRepository: IUpdatePasswordRepository
  ) {
    super();
  }

  public async update(
    command: UpdatePasswordCommand
  ): Promise<ServiceResponse<boolean>> {
    const errors = CreateUserValidator.validatePassword(command.password);

    if (errors.length) return this.failures(errors);

    const hashedPassword = await CreateUserService.hashPassword(
      command.password
    );
    await this.updatePasswordRepository.update({
      userId: command.userId,
      hashedPassword: hashedPassword
    } satisfies UpdatePasswordQuery);

    return this.success(true);
  }
}
