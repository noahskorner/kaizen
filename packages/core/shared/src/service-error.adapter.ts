import { ApiError } from './api-error';
import { ServiceError } from './service-error';

export class ServiceErrorAdapter {
  public static toApiError(serviceError: ServiceError): ApiError {
    return {
      code: serviceError.code,
      // TODO: LOCALIZATION
      message: serviceError.code
    };
  }
}
