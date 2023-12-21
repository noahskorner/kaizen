import { ApiResponse, Errors } from '@kaizen/core';
import { compare } from 'bcrypt';
import { FindUserByEmailRepository } from '@kaizen/core-server';
import { LoginCommand } from './login.command';
import { AuthService } from '../auth.service';
import { AuthToken } from '@kaizen/auth';

export class LoginService extends AuthService {
  constructor(
    private readonly _findUserByEmailRepository: FindUserByEmailRepository
  ) {
    super();
  }

  public async login(command: LoginCommand): Promise<ApiResponse<AuthToken>> {
    if (command.email == null || command.password == null) {
      return this.failure(Errors.LOGIN_INCORECT_EMAIL_OR_PASSWORD);
    }

    const normalizedEmail = this.normalizeEmail(command.email);
    const userRecord = await this._findUserByEmailRepository.findByEmail({
      normalizedEmail
    });

    if (userRecord == null) {
      return this.failure(Errors.LOGIN_INCORECT_EMAIL_OR_PASSWORD);
    }

    const passwordMatch = await compare(command.password, userRecord.password);
    if (!passwordMatch) {
      return this.failure(Errors.LOGIN_INCORECT_EMAIL_OR_PASSWORD);
    }

    const authToken: AuthToken = {
      accessToken: this.createAccessToken(userRecord),
      refreshToken: this.createRefreshToken(userRecord)
    };
    return this.success(authToken);
  }
}
