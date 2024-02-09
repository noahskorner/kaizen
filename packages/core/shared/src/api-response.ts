import { ApiError } from './api-error';

export interface ApiSuccessResponse<T> {
  type: 'SUCCESS';
  data: T;
}

export interface ApiFailureResponse {
  type: 'FAILURE';
  errors: ApiError[];
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;
