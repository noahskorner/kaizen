import { Service } from '@kaizen/core-server';
import { UserRepository } from '@kaizen/core-server';

export class UserService extends Service {
  constructor(protected readonly _userRepository: UserRepository) {
    super();
  }
}
