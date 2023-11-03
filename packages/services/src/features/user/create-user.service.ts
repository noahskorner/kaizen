import { ApiError } from '../../api-error';
import { ApiResponse } from '../../api-response';
import { Errors } from '../../errors';
import { Service } from '../../services';
import { CreateUserCommand } from './create-user.command';
import { User } from '@kaizen/core';
import { UserRepository } from './user.repository';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class CreateUserService extends Service {
  private readonly _userRepository: UserRepository;

  constructor() {
    super();
    this._userRepository = new UserRepository();
  }

  public async create(command: CreateUserCommand): Promise<ApiResponse<User>> {
    const errors = this.validate(command);
    if (errors.length > 0) {
      return this.failures(errors);
    }

    const existingUser = await this._userRepository.findByEmail(command.email);
    if (existingUser != null) {
      return this.failure(Errors.CREATE_USER_EMAIL_ALREADY_EXISTS);
    }

    const user = await this._userRepository.create(command);
    return this.success(user);
  }

  private validate(command: CreateUserCommand): ApiError[] {
    const errors: ApiError[] = [];

    if (command.email == null) {
      errors.push(Errors.CREATE_USER_INVALID_EMAIL);
    }
    if (!emailRegex.test(command.email)) {
      errors.push(Errors.CREATE_USER_INVALID_EMAIL);
    }
    if (command.password == null) {
      errors.push(Errors.CREATE_USER_INVALID_PASSWORD);
    } else {
      if (command.password.length < 8) {
        errors.push(Errors.CREATE_USER_PASSWORD_TOO_SHORT);
      }
      if (!/\d/.test(command.password)) {
        errors.push(Errors.CREATE_USER_PASSWORD_NO_NUMBER);
      }
      if (!/[!@#$%^&*]/.test(command.password)) {
        errors.push(Errors.CREATE_USER_PASSWORD_NO_SYMBOL);
      }
    }

    return errors;
  }
}
