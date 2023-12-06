import { apiClient } from '@kaizen/ui';
import { CreateInstitutionRequest, Institution } from '@kaizen/institution';

export const InstitutionService = {
  create: (request: CreateInstitutionRequest) =>
    apiClient.post<Institution>('/institution', request),
  find: () => apiClient.get<Institution[]>('/institution')
};
