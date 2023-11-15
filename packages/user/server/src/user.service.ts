import { Service } from '@kaizen/core';
import { UserRepository } from './user.repository';

export class UserService extends Service {
  protected readonly _userRepository: UserRepository;

  constructor() {
    super();
    this._userRepository = new UserRepository();
  }
}
