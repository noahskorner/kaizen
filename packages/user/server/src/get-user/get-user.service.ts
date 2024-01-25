import {
  IGetUserRepository,
  User,
  GetUserCommand,
  IGetUserService
} from '@kaizen/user';
import { Service } from '@kaizen/core-server';

export class GetUserService extends Service implements IGetUserService {
  constructor(private readonly _getUserRepository: IGetUserRepository) {
    super();
  }

  public async get(command: GetUserCommand): Promise<User | null> {
    return await this._getUserRepository.get({ userId: command.userId });
  }
}
