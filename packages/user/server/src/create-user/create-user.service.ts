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
import {
  CreateUserSuccessEvent,
  IServiceEventBus,
  Service,
  ServiceEventType
} from '@kaizen/core-server';

export class CreateUserService extends Service implements ICreateUserService {
  constructor(
    private readonly _findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly _createUserRepository: ICreateUserRepository,
    private readonly _serviceEventBus: IServiceEventBus
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

    const hashedPassword = await CreateUserService.hashPassword(
      command.password
    );
    const userRecord = await this._createUserRepository.create({
      normalizedEmail,
      hashedPassword
    });

    const event: CreateUserSuccessEvent = {
      type: ServiceEventType.CREATE_USER_SUCCESS,
      payload: {
        userId: userRecord.id
      }
    };
    this._serviceEventBus.publish(event);

    const user: User = {
      id: userRecord.id,
      email: userRecord.email
    };
    return this.success(user);
  }

  public static async hashPassword(password: string): Promise<string> {
    const salt = await genSalt();
    return await hash(password, salt);
  }
}
