import { ApiError } from './api-error';
import { ApiFailureResponse, ApiSuccessResponse } from './api-response';

export abstract class Service {
  protected success<T>(data: T): ApiSuccessResponse<T> {
    const response: ApiSuccessResponse<T> = {
      type: 'SUCCESS',
      data: data
    };

    return response;
  }

  protected failure(error: ApiError): ApiFailureResponse {
    const response: ApiFailureResponse = {
      type: 'FAILURE',
      errors: [error]
    };

    return response;
  }

  protected failures(errors: ApiError[]): ApiFailureResponse {
    const response: ApiFailureResponse = {
      type: 'FAILURE',
      errors: errors
    };

    return response;
  }

  protected normalizeEmail(email: string): string {
    return email.toLowerCase();
  }
}
