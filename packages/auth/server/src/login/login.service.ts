import { ErrorCode, ServiceResponse } from '@kaizen/core';
import { compare } from 'bcrypt';
import { AuthService } from '../auth.service';
import { AuthToken, ILoginService, LoginCommand } from '@kaizen/auth';
import { IFindUserByEmailRepository } from '@kaizen/user';
import {
  IServiceEventBus,
  LoginSuccessEvent,
  ServiceEventType
} from '@kaizen/core-server';

export class LoginService extends AuthService implements ILoginService {
  constructor(
    protected readonly ACCESS_TOKEN_SECRET: string,
    protected readonly ACCESS_TOKEN_EXPIRATION: string,
    protected readonly REFRESH_TOKEN_SECRET: string,
    protected readonly REFRESH_TOKEN_EXPIRATION: string,
    private readonly _findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly _serviceEventBus: IServiceEventBus
  ) {
    super(
      ACCESS_TOKEN_SECRET,
      ACCESS_TOKEN_EXPIRATION,
      REFRESH_TOKEN_SECRET,
      REFRESH_TOKEN_EXPIRATION
    );
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
