import { InstitutionRecord, prisma } from '@kaizen/data';
import { FindInstitutionsQuery } from './find-institutions.query';

export class FindInstitutionsRepository {
  public async findAll(
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
