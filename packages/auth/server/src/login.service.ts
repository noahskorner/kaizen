import { ApiResponse, AuthToken, Errors } from '@kaizen/core';
import { compare } from 'bcrypt';
import { UserRepository } from '../../../user/server/src';
import { LoginCommand } from './login.command';
import { AuthService } from './auth.service';

export class LoginService extends AuthService {
  private readonly _userRepository: UserRepository;

  constructor() {
    super();
    this._userRepository = new UserRepository();
  }

  public async login(command: LoginCommand): Promise<ApiResponse<AuthToken>> {
    if (command.email == null || command.password == null) {
      return this.failure(Errors.LOGIN_INCORECT_EMAIL_OR_PASSWORD);
    }

    const normalizedEmail = this.normalizeEmail(command.email);
    const userRecord = await this._userRepository.findByEmail(normalizedEmail);

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
