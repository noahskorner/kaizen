import { ApiResponse } from '@kaizen/core';
import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';
import { UpdateUserEmailRequest } from '@kaizen/user';

export const UpdateUserEmailClient = {
  update: (request: UpdateUserEmailRequest): Promise<ApiResponse<boolean>> => {
    return handleAxiosRequest(() => {
      return ApiClient.patch<ApiResponse<boolean>>(
        `/user/${request.userId}/email`,
        request
      );
    });
  }
};
