import { Repository } from '@kaizen/core-server';
import {
  FindInstitutionsQuery,
  IFindInstitutionsRepository,
  InstitutionRecord
} from '@kaizen/finance';

export class FindInstitutionsRepository
  extends Repository
  implements IFindInstitutionsRepository
{
  public async find(
    query: FindInstitutionsQuery
  ): Promise<InstitutionRecord[]> {
    return await this._prisma.institutionRecord.findMany({
      where: {
        userId: query.userId
      },
      include: {
        accounts: true
      }
    });
  }
}
