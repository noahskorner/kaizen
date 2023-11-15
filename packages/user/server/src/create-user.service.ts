import { CreateUserCommand } from './create-user.command';
import { ApiError, ApiResponse, Errors, User } from '@kaizen/core';
import { genSalt, hash } from 'bcrypt';
import { UserService } from './user.service';
import { GetUserService } from './get-user-service';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class CreateUserService extends UserService {
  private readonly _getUserService: GetUserService;

  constructor() {
    super();
    this._getUserService = new GetUserService();
  }

  public async create(command: CreateUserCommand): Promise<ApiResponse<User>> {
    const errors = this.validate(command);
    if (errors.length > 0) {
      return this.failures(errors);
    }

    const existingUser = await this._getUserService.findByEmail(command.email);
    if (existingUser != null) {
      return this.failure(Errors.CREATE_USER_EMAIL_ALREADY_EXISTS);
    }

    const normalizedEmail = this.normalizeEmail(command.email);
    const hashedPassword = await this.hashPassword(command.password);
    const user = await this._userRepository.create({
      email: normalizedEmail,
      password: hashedPassword
    });
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

  private async hashPassword(password: string): Promise<string> {
    const salt = await genSalt();
    return await hash(password, salt);
  }
}
