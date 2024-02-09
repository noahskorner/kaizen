import { ServiceError } from './service-error';

export interface ServiceSuccessResponse<T> {
  type: 'SUCCESS';
  data: T;
}

export interface ServiceFailureResponse {
  type: 'FAILURE';
  errors: ServiceError[];
}

export type ServiceResponse<T> =
  | ServiceSuccessResponse<T>
  | ServiceFailureResponse;
