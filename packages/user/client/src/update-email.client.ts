import { ApiResponse } from '@kaizen/core';
import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';
import { UpdateEmailRequest } from '@kaizen/user';

export const UpdateEmailClient = {
  update: (request: UpdateEmailRequest): Promise<ApiResponse<boolean>> => {
    return handleAxiosRequest(() => {
      return ApiClient.post<ApiResponse<boolean>>(`/user/email/token`, request);
    });
  }
};
