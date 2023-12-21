import { prisma, InstitutionRecord } from '@kaizen/data';
import { CreateInstitutionQuery } from './create-institution.query';

export class CreateInstitutionRepository {
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
}
