import { CreateUserCommand } from './create-user.command';
import { ApiResponse, Errors } from '@kaizen/core';
import { genSalt, hash } from 'bcrypt';
import { CreateUserValidator, User } from '@kaizen/user';
import {
  CreateUserRepository,
  FindUserByEmailRepository,
  Service
} from '@kaizen/core-server';

export class CreateUserService extends Service {
  constructor(
    private readonly _findUserByEmailRepository: FindUserByEmailRepository,
    private readonly _createUserRepository: CreateUserRepository,
    private readonly _createUserValidator: CreateUserValidator
  ) {
    super();
  }

  public async create(command: CreateUserCommand): Promise<ApiResponse<User>> {
    const errors = this._createUserValidator.validate(command);
    if (errors.length > 0) {
      return this.failures(errors);
    }

    const normalizedEmail = this.normalizeEmail(command.email);
    const existingUser = await this._findUserByEmailRepository.findByEmail({
      normalizedEmail: normalizedEmail
    });
    if (existingUser != null) {
      return this.failure(Errors.CREATE_USER_EMAIL_ALREADY_EXISTS);
    }

    const hashedPassword = await this.hashPassword(command.password);
    const userRecord = await this._createUserRepository.create({
      normalizedEmail,
      hashedPassword
    });

    const user: User = {
      id: userRecord.id,
      email: userRecord.email
    };
    return this.success(user);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await genSalt();
    return await hash(password, salt);
  }
}
