import { ServiceResponse } from '@kaizen/core';
import { CreateInstitutionCommand } from './create-institution.command';
import { Institution } from '../institution';

export interface ICreateInstitutionService {
  create(
    command: CreateInstitutionCommand
  ): Promise<ServiceResponse<Institution>>;
}
