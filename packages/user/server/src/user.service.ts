import { Service } from '@kaizen/core';
import { UserRepository } from './user.repository';

export class UserService extends Service {
  constructor(protected readonly _userRepository: UserRepository) {
    super();
  }
}
