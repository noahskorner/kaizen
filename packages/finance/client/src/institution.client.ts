import { ApiClient } from '@kaizen/core-client';
import { CreateInstitutionRequest, Institution } from '@kaizen/finance';
import { ApiResponse } from '@kaizen/core';
import { handleAxiosRequest } from '@kaizen/core-client';

export const InstitutionClient = {
  create: (
    request: CreateInstitutionRequest
  ): Promise<ApiResponse<Institution>> => {
    return handleAxiosRequest(() => {
      return ApiClient.post<ApiResponse<Institution>>('/institution', request);
    });
  },
  find: () => {
    return handleAxiosRequest(() => {
      return ApiClient.get<ApiResponse<Institution[]>>('/institution');
    });
  }
};
