import { User } from '@kaizen/core';
import { UserService } from './user.service';

export class GetUserService extends UserService {
  public async findByEmail(email: string): Promise<User | null> {
    const normalizedEmail = this.normalizeEmail(email);

    return await this._userRepository.findByEmail(normalizedEmail);
  }
}
