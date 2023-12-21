import { User } from '@kaizen/user';
import { GetUserCommand } from './get-user.command';
import { GetUserRepository, Service } from '@kaizen/core-server';

export class GetUserService extends Service {
  constructor(private readonly _getUserRepository: GetUserRepository) {
    super();
  }

  public async get(command: GetUserCommand): Promise<User | null> {
    return await this._getUserRepository.get({ userId: command.userId });
  }
}
