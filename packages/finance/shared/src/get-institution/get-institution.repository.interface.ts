import { InstitutionRecord } from '../institution-record';
import { GetInstitutionQuery } from './get-institution.query';

export interface IGetInstitutionRepository {
  get(query: GetInstitutionQuery): Promise<InstitutionRecord | null>;
}
