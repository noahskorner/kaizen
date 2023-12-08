import { CreateInstitutionQuery } from './create-institution.query';
import { FindAllInstitutionsQuery } from './find-all-institutions.query';
import { GetInstitutionQuery } from './get-institution.query';
import { prisma } from './prisma';
import { InstitutionRecord } from '@prisma/client';

export class InstitutionRepository {
  public async create(query: CreateInstitutionQuery) {
    return await prisma.institutionRecord.create({
      data: {
        userId: query.userId,
        plaidAccessToken: query.plaidAccessToken,
        accounts: {
          createMany: {
            data: query.accounts.map((account) => {
              return {
                externalId: account.externalId,
                current: account.current,
                available: account.available,
                type: account.type
              };
            })
          }
        }
      },
      include: {
        accounts: true
      }
    });
  }

  public async findAll(query: FindAllInstitutionsQuery) {
    return await prisma.institutionRecord.findMany({
      where: {
        userId: query.userId
      },
      include: {
        accounts: true
      }
    });
  }

  public async get(
    query: GetInstitutionQuery
  ): Promise<InstitutionRecord | null> {
    return await prisma.institutionRecord.findUnique({
      where: {
        id: query.id
      }
    });
  }
}
