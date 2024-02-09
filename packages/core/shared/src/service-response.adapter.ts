import { ApiResponse } from './api-response';
import { ServiceErrorAdapter } from './service-error.adapter';
import { ServiceResponse } from './service-response';

export class ServiceResponseAdapter {
  public static toApiResponse<T>(
    serviceResponse: ServiceResponse<T>
  ): ApiResponse<T> {
    if (serviceResponse.type === 'SUCCESS') {
      return serviceResponse;
    }

    return {
      type: 'FAILURE',
      errors: serviceResponse.errors.map(ServiceErrorAdapter.toApiError)
    };
  }
}
