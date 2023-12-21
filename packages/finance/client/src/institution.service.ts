import { ApiClient } from '@kaizen/ui';
import { CreateInstitutionRequest, Institution } from '@kaizen/finance';
import { ApiResponse, handleAxiosRequest } from '@kaizen/core';

export const InstitutionService = {
  create: (
    request: CreateInstitutionRequest
  ): Promise<ApiResponse<Institution>> => {
    return handleAxiosRequest(() => {
      return ApiClient.post<ApiResponse<Institution>>(
        '/finance/institution',
        request
      );
    });
  },
  find: () => {
    return handleAxiosRequest(() => {
      return ApiClient.get<ApiResponse<Institution[]>>('/finance/institution');
    });
  }
};
