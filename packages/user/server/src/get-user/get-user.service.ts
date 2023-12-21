import { User } from '@kaizen/user';
import { UserService } from '../user.service';
import { GetUserCommand } from './get-user.command';

export class GetUserService extends UserService {
  public async get(command: GetUserCommand): Promise<User | null> {
    return await this._userRepository.get(command.userId);
  }
}
