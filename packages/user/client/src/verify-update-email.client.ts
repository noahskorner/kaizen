import { ApiResponse } from '@kaizen/core';
import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';
import { User, VerifyUpdateEmailRequest } from '@kaizen/user';

export const VerifyUpdateEmailClient = {
  verify: (request: VerifyUpdateEmailRequest): Promise<ApiResponse<User>> => {
    return handleAxiosRequest(() => {
      return ApiClient.put<ApiResponse<User>>(`/user/email`, request);
    });
  }
};
