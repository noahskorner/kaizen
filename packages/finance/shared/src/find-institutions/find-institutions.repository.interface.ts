import { InstitutionRecord } from '../institution-record';
import { FindInstitutionsQuery } from './find-institutions.query';

export interface IFindInstitutionsRepository {
  find(query: FindInstitutionsQuery): Promise<InstitutionRecord[]>;
}
