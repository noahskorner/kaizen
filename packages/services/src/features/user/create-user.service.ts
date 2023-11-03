import { ApiResponse } from '../../api-response';
import { Errors } from '../../errors';
import { Service } from '../../services';
import { CreateUserCommand } from './create-user.command';
import { User } from '@kaizen/core';

export class CreateUserService extends Service {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async create(request: CreateUserCommand): Promise<ApiResponse<User>> {
    return this.failure(Errors.CREATE_USER_INVALID_EMAIL);
  }
}
