import { ApiResponse } from '../api-response';
import { CreateUserCommand } from './create-user.command';
import { User } from './user';

export class CreateUserService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public create(request: CreateUserCommand): Promise<ApiResponse<User>> {
    throw new Error('Method not implemented.');
  }
}
