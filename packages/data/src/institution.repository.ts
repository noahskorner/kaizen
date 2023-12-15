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

    // TODO: Here, let's emit up an event, and then create the transactions async instead.
    const accountRecords = await Promise.all(
      query.accounts.map((createAccountQuery) => {
        return prisma.accountRecord.create({
          data: {
            institutionId: institutionRecord.id,
            externalId: createAccountQuery.externalId,
            current: createAccountQuery.current,
            available: createAccountQuery.available,
            type: createAccountQuery.type,
            transactions: {
              createMany: {
                data: createAccountQuery.transactions.map(
                  (createTransactionQuery) => {
                    return {
                      externalId: createTransactionQuery.externalId
                    };
                  }
                )
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
