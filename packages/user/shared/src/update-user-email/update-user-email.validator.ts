import { ErrorCode, ServiceError } from '@kaizen/core';
import { emailRegex } from '../email.regex';
import { UpdateUserEmailRequest } from './update-user-email.request';

export class UpdateUserEmailValidator {
  public static validate(request: UpdateUserEmailRequest): ServiceError[] {
    return [...UpdateUserEmailValidator.validateEmail(request.email)];
  }

  public static validateEmail(email: string): ServiceError[] {
    const errors: ServiceError[] = [];

    if (email == null) {
      errors.push({
        code: ErrorCode.UPDATE_USER_EMAIL_INVALID_EMAIL,
        params: { email }
      });
    }
    if (!emailRegex.test(email)) {
      errors.push({
        code: ErrorCode.UPDATE_USER_EMAIL_INVALID_EMAIL,
        params: { email }
      });
    }

    return errors;
  }
}
