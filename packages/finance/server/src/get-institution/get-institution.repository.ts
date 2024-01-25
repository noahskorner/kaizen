import { Repository } from '@kaizen/core-server';
import {
  GetInstitutionQuery,
  IGetInstitutionRepository,
  InstitutionRecord
} from '@kaizen/finance';

export class GetInstitutionRepository
  extends Repository
  implements IGetInstitutionRepository
{
  public async get(
    query: GetInstitutionQuery
  ): Promise<InstitutionRecord | null> {
    return await this._prisma.institutionRecord.findUnique({
      where: {
        id: query.institutionId,
        userId: query.userId
      },
      include: {
        accounts: true
      }
    });
  }
}
