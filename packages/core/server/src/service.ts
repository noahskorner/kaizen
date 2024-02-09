import {
  ServiceError,
  ServiceFailureResponse,
  ServiceResponse,
  ServiceSuccessResponse
} from '@kaizen/core';

export abstract class Service {
  protected success<T>(data: T): ServiceSuccessResponse<T> {
    const response: ServiceSuccessResponse<T> = {
      type: 'SUCCESS',
      data: data
    };

    return response;
  }

  protected failure(error: ServiceError): ServiceFailureResponse {
    const response: ServiceFailureResponse = {
      type: 'FAILURE',
      errors: [error]
    };

    return response;
  }

  protected failures(errors: ServiceError[]): ServiceFailureResponse {
    const response: ServiceFailureResponse = {
      type: 'FAILURE',
      errors: errors
    };

    return response;
  }

  protected normalizeEmail(email: string): string {
    return email.toLowerCase();
  }

  protected getFailures<T>(responses: ServiceResponse<T>[]): ServiceError[] {
    return responses
      .filter(
        (response): response is ServiceFailureResponse =>
          response.type === 'FAILURE'
      )
      .map((response: ServiceFailureResponse) => response.errors)
      .flat();
  }

  protected getSuccesses<T>(responses: ServiceResponse<T>[]): T[] {
    return responses
      .filter(
        (response): response is ServiceSuccessResponse<T> =>
          response.type === 'SUCCESS'
      )
      .map((response: ServiceSuccessResponse<T>) => response.data);
  }
}
