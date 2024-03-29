import { ErrorCode, ServiceResponse } from '@kaizen/core';
import { compare } from 'bcrypt';
import { AuthService } from '../auth.service';
import { AuthToken, ILoginService, LoginCommand } from '@kaizen/auth';
import { IFindUserByEmailRepository } from '@kaizen/user';
import { IServerEnvironment } from '@kaizen/env-server';
import {
  IServiceEventBus,
  LoginSuccessEvent,
  ServiceEventType
} from '@kaizen/core-server';

export class LoginService extends AuthService implements ILoginService {
  constructor(
    _environment: IServerEnvironment,
    private readonly _findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly _serviceEventBus: IServiceEventBus
  ) {
    super(_environment);
  }

  public async login(
    command: LoginCommand
  ): Promise<ServiceResponse<AuthToken>> {
    if (command.email == null || command.password == null) {
      return this.failure({
        code: ErrorCode.LOGIN_INCORECT_EMAIL_OR_PASSWORD
      });
    }

    const normalizedEmail = this.normalizeEmail(command.email);
    const userRecord = await this._findUserByEmailRepository.find({
      normalizedEmail
    });

    if (userRecord == null) {
      return this.failure({
        code: ErrorCode.LOGIN_INCORECT_EMAIL_OR_PASSWORD
      });
    }

    const passwordMatch = await compare(command.password, userRecord.password);
    if (!passwordMatch) {
      return this.failure({
        code: ErrorCode.LOGIN_INCORECT_EMAIL_OR_PASSWORD
      });
    }

    const event: LoginSuccessEvent = {
      type: ServiceEventType.LOGIN_SUCCESS,
      payload: {
        userId: userRecord.id
      }
    };
    this._serviceEventBus.publish(event);

    const authToken: AuthToken = {
      accessToken: this.createAccessToken(userRecord),
      refreshToken: this.createRefreshToken(userRecord)
    };
    return this.success(authToken);
  }
}
