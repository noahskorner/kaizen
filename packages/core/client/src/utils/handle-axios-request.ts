import {
  ApiFailureResponse,
  ApiSuccessResponse,
  ApiResponse,
  ErrorCode
} from '@kaizen/core';
import { AxiosError, AxiosResponse } from 'axios';

export const DEFAULT_API_SUCCESS_RESPONSE: ApiSuccessResponse<null> = {
  type: 'SUCCESS',
  data: null
};

export const DEFAULT_API_FAILURE_RESPONSE: ApiFailureResponse = {
  type: 'FAILURE',
  errors: [
    // TODO: LOCALIZATION
    {
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      message: ErrorCode.INTERNAL_SERVER_ERROR
    }
  ]
};

export const handleAxiosRequest = async <T>(
  request: () => Promise<AxiosResponse<ApiResponse<T>>>
): Promise<ApiResponse<T>> => {
  try {
    const response = await request();

    return response.data;
  } catch (e: unknown) {
    if (!(e instanceof AxiosError)) return DEFAULT_API_FAILURE_RESPONSE;

    const error: AxiosError<ApiFailureResponse> = e;

    if (!error.response) {
      return DEFAULT_API_FAILURE_RESPONSE;
    }
    return error.response.data;
  }
};
