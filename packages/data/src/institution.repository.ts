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
    const institutionRecords = await prisma.institutionRecord.findMany({
      where: {
        userId: query.userId
      }
    });

    const accountRecords = (
      await Promise.all(
        institutionRecords.map((institutionRecord) => {
          return prisma.accountRecord.findMany({
            where: {
              institutionId: institutionRecord.id
            },
            include: {
              transactions: true
            }
          });
        })
      )
    ).flatMap((accountRecords) => accountRecords);

    return institutionRecords.map((institutionRecord) => {
      return {
        ...institutionRecord,
        accounts: accountRecords.filter(
          (accountRecord) =>
            accountRecord.institutionId === institutionRecord.id
        )
      };
    });
  }
}
