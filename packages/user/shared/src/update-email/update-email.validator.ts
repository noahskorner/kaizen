import { ErrorCode, ServiceError } from '@kaizen/core';
import { emailRegex } from '../email.regex';
import { UpdateEmailRequest } from './update-email.request';

export class UpdateEmailValidator {
  public static validate(request: UpdateEmailRequest): ServiceError[] {
    return [...UpdateEmailValidator.validateEmail(request.email)];
  }

  public static validateEmail(email: string): ServiceError[] {
    const errors: ServiceError[] = [];

    if (email == null) {
      errors.push({
        code: ErrorCode.UPDATE_EMAIL_INVALID_EMAIL,
        params: { email }
      });
    }
    if (!emailRegex.test(email)) {
      errors.push({
        code: ErrorCode.UPDATE_EMAIL_INVALID_EMAIL,
        params: { email }
      });
    }

    return errors;
  }
}
