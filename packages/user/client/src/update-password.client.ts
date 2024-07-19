import { ApiResponse } from '@kaizen/core';
import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';
import { UpdatePasswordRequest } from '@kaizen/user';

export const UpdatePasswordClient = {
  update: (request: UpdatePasswordRequest): Promise<ApiResponse<boolean>> => {
    return handleAxiosRequest(() => {
      return ApiClient.post<ApiResponse<boolean>>(`/user/password/token`, request);
    });
  }
};
