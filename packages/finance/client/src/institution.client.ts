import { ApiClient, handleAxiosRequest } from '@kaizen/core-client';
import {
  CreateInstitutionRequest,
  Institution,
  SyncInstitutionsResponse
} from '@kaizen/finance';
import { ServiceResponse } from '@kaizen/core';

export const InstitutionClient = {
  create: (
    request: CreateInstitutionRequest
  ): Promise<ServiceResponse<Institution>> => {
    return handleAxiosRequest(() => {
      return ApiClient.post<ServiceResponse<Institution>>(
        '/institution',
        request
      );
    });
  },
  find: () => {
    return handleAxiosRequest(() => {
      return ApiClient.get<ServiceResponse<Institution[]>>('/institution');
    });
  },
  sync: () => {
    return handleAxiosRequest(() => {
      return ApiClient.put<ServiceResponse<SyncInstitutionsResponse>>(
        '/institution/sync'
      );
    });
  }
};
