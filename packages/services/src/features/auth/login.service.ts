import { AuthToken } from '@kaizen/core';
import { compare } from 'bcrypt';
import { ApiResponse } from '../../api-response';
import { Errors } from '../../errors';
import { Service } from '../../services';
import { UserRepository } from '../user';
import { LoginCommand } from './login.command';

export class LoginService extends Service {
  private readonly _userRepository: UserRepository;

  constructor() {
    super();
    this._userRepository = new UserRepository();
  }

  public async login(command: LoginCommand): Promise<ApiResponse<AuthToken>> {
    const normalizedEmail = this.normalizeEmail(command.email);
    const userRecord = await this._userRepository.findByEmail(normalizedEmail);

    if (userRecord == null) {
      return this.failure(Errors.LOGIN_INCORECT_EMAIL_OR_PASSWORD);
    }

    const passwordMatch = await compare(command.password, userRecord.password);
    if (!passwordMatch) {
      return this.failure(Errors.LOGIN_INCORECT_EMAIL_OR_PASSWORD);
    }

    throw new Error();
  }
}
