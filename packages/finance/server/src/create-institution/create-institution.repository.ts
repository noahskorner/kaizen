import { InstitutionRecord } from '@kaizen/finance/src/institution-record';
import { CreateInstitutionQuery } from '@kaizen/finance/src/create-institution/create-institution.query';
import { Repository } from '@kaizen/core-server';
import { ICreateInstitutionRepository } from '@kaizen/finance';

export class CreateInstitutionRepository
  extends Repository
  implements ICreateInstitutionRepository
{
  public async create(
    query: CreateInstitutionQuery
  ): Promise<InstitutionRecord> {
    const institutionRecord = await this._prisma.institutionRecord.create({
      data: {
        userId: query.userId,
        plaidAccessToken: query.plaidAccessToken
      }
    });

    const accountRecords = await Promise.all(
      query.accounts.map((createAccountQuery) => {
        return this._prisma.accountRecord.create({
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
