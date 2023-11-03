import { ApiError } from './api-error';
import { ApiFailureResponse, ApiSuccessResponse } from './api-response';

export abstract class Service {
  public success<T>(data: T): ApiSuccessResponse<T> {
    const response: ApiSuccessResponse<T> = {
      type: 'SUCCESS',
      data: data
    };

    return response;
  }

  public failure(error: ApiError): ApiFailureResponse {
    const response: ApiFailureResponse = {
      type: 'FAILURE',
      errors: [error]
    };

    return response;
  }

  public failures(errors: ApiError[]): ApiFailureResponse {
    const response: ApiFailureResponse = {
      type: 'FAILURE',
      errors: errors
    };

    return response;
  }
}
