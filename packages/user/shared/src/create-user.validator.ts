import { CreateUserRequest } from './create-user.request';
import { ApiError, Errors } from '@kaizen/core';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class CreateUserValidator {
  public static validate(command: CreateUserRequest): ApiError[] {
    return [
      ...CreateUserValidator.validateEmail(command.email),
      ...CreateUserValidator.validatePassword(command.password)
    ];
  }

  public static validateEmail(email: string): ApiError[] {
    const errors: ApiError[] = [];

    if (email == null) {
      errors.push(Errors.CREATE_USER_INVALID_EMAIL);
    }
    if (!emailRegex.test(email)) {
      errors.push(Errors.CREATE_USER_INVALID_EMAIL);
    }

    return errors;
  }

  public static validatePassword(password: string): ApiError[] {
    const errors: ApiError[] = [];

    if (password == null) {
      errors.push(Errors.CREATE_USER_INVALID_PASSWORD);
    } else {
      if (password.length < 8) {
        errors.push(Errors.CREATE_USER_PASSWORD_TOO_SHORT);
      }
      if (!/\d/.test(password)) {
        errors.push(Errors.CREATE_USER_PASSWORD_NO_NUMBER);
      }
      if (!/[!@#$%^&*]/.test(password)) {
        errors.push(Errors.CREATE_USER_PASSWORD_NO_SYMBOL);
      }
    }

    return errors;
  }
}
