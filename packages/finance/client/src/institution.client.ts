import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';
import {
  CreateInstitutionRequest,
  Institution,
  SyncInstitutionsResponse
} from '@kaizen/finance';
import { ApiResponse } from '@kaizen/core';

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
  },
  sync: () => {
    return handleAxiosRequest(() => {
      return ApiClient.put<ApiResponse<SyncInstitutionsResponse>>(
        '/institution/sync'
      );
    });
  }
};
