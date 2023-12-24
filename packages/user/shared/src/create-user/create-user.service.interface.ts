import { ApiResponse } from '@kaizen/core';
import { User } from '@kaizen/user';
import { CreateUserCommand } from './create-user.command';

export interface ICreateUserService {
  create: (command: CreateUserCommand) => Promise<ApiResponse<User>>;
}
