import { ErrorCode, ServiceResponse } from '@kaizen/core';
import { genSalt, hash } from 'bcrypt';
import {
  CreateUserValidator,
  ICreateUserRepository,
  ICreateUserService,
  IFindUserByEmailRepository,
  User,
  CreateUserCommand
} from '@kaizen/user';
import { Service } from '@kaizen/core-server';

export class CreateUserService extends Service implements ICreateUserService {
  constructor(
    private readonly _findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly _createUserRepository: ICreateUserRepository
  ) {
    super();
  }

  public async create(
    command: CreateUserCommand
  ): Promise<ServiceResponse<User>> {
    const errors = CreateUserValidator.validate(command);
    if (errors.length > 0) {
      return this.failures(errors);
    }

    const normalizedEmail = this.normalizeEmail(command.email);
    const existingUser = await this._findUserByEmailRepository.find({
      normalizedEmail: normalizedEmail
    });
    if (existingUser != null) {
      return this.failure({
        code: ErrorCode.CREATE_USER_EMAIL_ALREADY_EXISTS,
        params: { email: command.email }
      });
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
