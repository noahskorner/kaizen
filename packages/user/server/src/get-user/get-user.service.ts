import { IGetUserRepository, User } from '@kaizen/user';
import { GetUserCommand } from '@kaizen/user/src/get-user/get-user.command';
import { Service } from '@kaizen/core-server';
import { IGetUserService } from '@kaizen/user/src/get-user/get-user.service.interface';

export class GetUserService extends Service implements IGetUserService {
  constructor(private readonly _getUserRepository: IGetUserRepository) {
    super();
  }

  public async get(command: GetUserCommand): Promise<User | null> {
    return await this._getUserRepository.get({ userId: command.userId });
  }
}
