import { InstitutionRecord } from '../institution-record';
import { CreateInstitutionQuery } from './create-institution.query';

export interface ICreateInstitutionRepository {
  create(query: CreateInstitutionQuery): Promise<InstitutionRecord>;
}
