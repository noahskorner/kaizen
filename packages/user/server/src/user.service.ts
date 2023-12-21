import { Service } from '@kaizen/core-server';
import { UserRepository } from '@kaizen/data';

export class UserService extends Service {
  constructor(protected readonly _userRepository: UserRepository) {
    super();
  }
}
