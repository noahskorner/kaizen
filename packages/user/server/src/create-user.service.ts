import { CreateUserCommand } from './create-user.command';
import { ApiResponse, Errors } from '@kaizen/core';
import { genSalt, hash } from 'bcrypt';
import { UserService } from './user.service';
import { GetUserService } from './get-user-service';
import { CreateUserValidator, User } from '@kaizen/user';
import { UserRepository } from '@kaizen/data';

export class CreateUserService extends UserService {
  constructor(
    _userRepository: UserRepository,
    private readonly _getUserService: GetUserService,
    private readonly _createUserValidator: CreateUserValidator
  ) {
    super(_userRepository);
  }

  public async create(command: CreateUserCommand): Promise<ApiResponse<User>> {
    const errors = this._createUserValidator.validate(command);
    if (errors.length > 0) {
      return this.failures(errors);
    }

    const existingUser = await this._getUserService.findByEmail(command.email);
    if (existingUser != null) {
      return this.failure(Errors.CREATE_USER_EMAIL_ALREADY_EXISTS);
    }

    const normalizedEmail = this.normalizeEmail(command.email);
    const hashedPassword = await this.hashPassword(command.password);
    const userRecord = await this._userRepository.create(
      normalizedEmail,
      hashedPassword
    );

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
