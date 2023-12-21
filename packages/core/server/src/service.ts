import { ApiError } from '@kaizen/core';
import {
  ApiFailureResponse,
  ApiResponse,
  ApiSuccessResponse
} from '@kaizen/core';

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

  protected getFailures<T>(responses: ApiResponse<T>[]): ApiError[] {
    return responses
      .filter(
        (response): response is ApiFailureResponse =>
          response.type === 'FAILURE'
      )
      .map((response: ApiFailureResponse) => response.errors)
      .flat();
  }

  protected getSuccesses<T>(responses: ApiResponse<T>[]): T[] {
    return responses
      .filter(
        (response): response is ApiSuccessResponse<T> =>
          response.type === 'SUCCESS'
      )
      .map((response: ApiSuccessResponse<T>) => response.data);
  }
}
