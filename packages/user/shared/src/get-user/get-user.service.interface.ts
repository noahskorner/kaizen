import { ServiceResponse } from '@kaizen/core';
import { User } from '../user';
import { GetUserCommand } from './get-user.command';

export interface IGetUserService {
  get(command: GetUserCommand): Promise<ServiceResponse<User | null>>;
}
