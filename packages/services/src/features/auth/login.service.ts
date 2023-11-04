import { AuthToken, User } from '@kaizen/core';
import { compare } from 'bcrypt';
import { ApiResponse } from '../../api-response';
import { Errors } from '../../errors';
import { Service } from '../../services';
import { UserRepository } from '../user';
import { LoginCommand } from './login.command';
import jwt from 'jsonwebtoken';
import { environment } from '@kaizen/env';

export class LoginService extends Service {
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

  private createAccessToken(user: User): string {
    const accessToken = jwt.sign(user, environment.ACCESS_TOKEN_SECRET, {
      expiresIn: environment.ACCESS_TOKEN_EXPIRATION
    });

    return accessToken;
  }

  private createRefreshToken(user: User): string {
    const refreshToken = jwt.sign(user, environment.REFRESH_TOKEN_SECRET, {
      expiresIn: environment.REFRESH_TOKEN_EXPIRATION
    });

    return refreshToken;
  }
}
