import { InstitutionRecord } from '../institution-record';
import { UpdateInstitutionQuery } from './update-institution.query';

export interface IUpdateInstitutionRepository {
  update(query: UpdateInstitutionQuery): Promise<InstitutionRecord>;
}
