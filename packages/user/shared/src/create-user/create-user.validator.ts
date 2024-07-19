import { ErrorCode, ServiceError } from '@kaizen/core';
import { CreateUserRequest } from './create-user.request';
import { emailRegex } from '../email.regex';

export class CreateUserValidator {
  public static validate(command: CreateUserRequest): ServiceError[] {
    return [
      ...CreateUserValidator.validateEmail(command.email),
      ...CreateUserValidator.validatePassword(command.password)
    ];
  }

  public static validateEmail(email: string): ServiceError[] {
    const errors: ServiceError[] = [];

    if (email == null) {
      errors.push({
        code: ErrorCode.CREATE_USER_INVALID_EMAIL,
        params: { email }
      });
    }
    if (!emailRegex.test(email)) {
      errors.push({
        code: ErrorCode.CREATE_USER_INVALID_EMAIL,
        params: { email }
      });
    }

    return errors;
  }

  public static validatePassword(password: string): ServiceError[] {
    const errors: ServiceError[] = [];

    if (password == null) {
      errors.push({
        code: ErrorCode.CREATE_USER_INVALID_PASSWORD,
        params: { password }
      });
    } else {
      if (password.length < 8) {
        errors.push({
          code: ErrorCode.CREATE_USER_PASSWORD_TOO_SHORT,
          params: { password }
        });
      }
      if (!/\d/.test(password)) {
        errors.push({
          code: ErrorCode.CREATE_USER_PASSWORD_NO_NUMBER,
          params: { password }
        });
      }
      if (!/[!@#$%^&*]/.test(password)) {
        errors.push({
          code: ErrorCode.CREATE_USER_PASSWORD_NO_SYMBOL,
          params: { password }
        });
      }
    }

    return errors;
  }
}
