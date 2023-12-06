import { apiClient } from '@kaizen/ui';
import { CreateInstitutionRequest, Institution } from '@kaizen/institution';

export const InstituionService = {
  create: (request: CreateInstitutionRequest) =>
    apiClient.post<Institution>('/institution', request),
  find: () => apiClient.get<Institution[]>('/institution')
};
