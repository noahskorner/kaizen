import { ApiResponse } from '@kaizen/core';
import { CreateUserCommand } from './create-user.command';
import { User } from '../user';

export interface ICreateUserService {
  create: (command: CreateUserCommand) => Promise<ApiResponse<User>>;
}
