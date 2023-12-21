import { prisma } from '../_prisma';
import { InstitutionRecord } from '../institution-record';
import { FindInstitutionsQuery } from './find-institutions.query';

export class FindInstitutionsRepository {
  public async find(
    query: FindInstitutionsQuery
  ): Promise<InstitutionRecord[]> {
    return await prisma.institutionRecord.findMany({
      where: {
        userId: query.userId
      },
      include: {
        accounts: true
      }
    });
  }
}
