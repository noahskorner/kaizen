import { CreateInstitutionQuery } from './create-institution.query';
import { FindAllInstitutionsQuery } from './find-all-institutions.query';
import { InstitutionRecord } from './institution-record';
import { prisma } from './prisma';

export class InstitutionRepository {
  public async create(
    query: CreateInstitutionQuery
  ): Promise<InstitutionRecord> {
    const institutionRecord = await prisma.institutionRecord.create({
      data: {
        userId: query.userId,
        plaidAccessToken: query.plaidAccessToken
      }
    });

    const accountRecords = await Promise.all(
      query.accounts.map((createAccountQuery) => {
        return prisma.accountRecord.create({
          data: {
            institutionId: institutionRecord.id,
            ...createAccountQuery,
            transactions: {
              createMany: {
                data: createAccountQuery.transactions
              }
            }
          },
          include: {
            transactions: true
          }
        });
      })
    );

    return {
      ...institutionRecord,
      accounts: accountRecords
    };
  }

  public async findAll(
    query: FindAllInstitutionsQuery
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
