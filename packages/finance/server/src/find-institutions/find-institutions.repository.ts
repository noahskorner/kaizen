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
    let where: {
      userId: string;
      id?: {
        in: string[];
      };
    } = {
      userId: query.userId
    };
    if (query.institutionIds != null && query.institutionIds.length > 0) {
      where = {
        ...where,
        id: {
          in: query.institutionIds
        }
      };
    }

    return await this._prisma.institutionRecord.findMany({
      where: where,
      include: {
        accounts: true
      }
    });
  }
}
