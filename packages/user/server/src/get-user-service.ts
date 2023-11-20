import { User } from '@kaizen/user';
import { UserService } from './user.service';

export class GetUserService extends UserService {
  public async get(id: string): Promise<User | null> {
    return await this._userRepository.get(id);
  }

  public async findByEmail(email: string): Promise<User | null> {
    const normalizedEmail = this.normalizeEmail(email);

    return await this._userRepository.findByEmail(normalizedEmail);
  }
}
