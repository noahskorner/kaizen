import {
  IGetUserRepository,
  User,
  GetUserCommand,
  IGetUserService
} from '@kaizen/user';
import { Service } from '@kaizen/core-server';
import { ErrorCode, ServiceResponse } from '@kaizen/core';

export class GetUserService extends Service implements IGetUserService {
  constructor(private readonly _getUserRepository: IGetUserRepository) {
    super();
  }

  public async get(
    command: GetUserCommand
  ): Promise<ServiceResponse<User | null>> {
    const user = await this._getUserRepository.get({ userId: command.userId });

    if (user == null) {
      return this.failure({
        code: ErrorCode.GET_USER_NOT_FOUND,
        params: { userId: command.userId }
      });
    }

    return this.success(user);
  }
}
