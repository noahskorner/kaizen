import { Repository } from '@kaizen/core-server';
import {
  ISyncTransactionsRepository,
  SyncTransactionRecordsResponse,
  SyncTransactionsQuery,
  TransactionRecord
} from '@kaizen/finance';

export class SyncTransactionsRepository
  extends Repository
  implements ISyncTransactionsRepository
{
  public async sync(
    query: SyncTransactionsQuery
  ): Promise<SyncTransactionRecordsResponse> {
    const [updatedInstitutionRecord, ...transactionRecords] =
      await this._prisma.$transaction([
        // Update the institutionRecord with the latest cursor
        this._prisma.institutionRecord.update({
          data: {
            plaidCursor: query.updateInstitutionQuery.cursor
          },
          where: {
            id: query.updateInstitutionQuery.institutionId
          },
          include: {
            accounts: true
          }
        }),
        // Create the new transactions
        ...query.createTransactionQueries.map((createTransactionQuery) => {
          return this._prisma.transactionRecord.create({
            include: {
              category: true,
              location: true
            },
            data: {
              externalId: createTransactionQuery.externalId,
              externalAccountId: createTransactionQuery.externalAccountId,
              amount: createTransactionQuery.amount,
              isoCurrencyCode: createTransactionQuery.isoCurrencyCode,
              unofficialCurrencyCode:
                createTransactionQuery.unofficialCurrencyCode,
              checkNumber: createTransactionQuery.checkNumber,
              date: createTransactionQuery.date,
              name: createTransactionQuery.name,
              merchantName: createTransactionQuery.merchantName,
              originalDescription: createTransactionQuery.originalDescription,
              pending: createTransactionQuery.pending,
              pendingTransactionId: createTransactionQuery.pendingTransactionId,
              accountOwner: createTransactionQuery.accountOwner,
              logoUrl: createTransactionQuery.logoUrl,
              website: createTransactionQuery.website,
              authorizedDate: createTransactionQuery.authorizedDate,
              authorizedDatetime: createTransactionQuery.authorizedDatetime,
              datetime: createTransactionQuery.datetime,
              paymentChannel: createTransactionQuery.paymentChannel,
              code: createTransactionQuery.code,
              merchantEntityId: createTransactionQuery.merchantEntityId,
              user: {
                connect: {
                  id: createTransactionQuery.userId
                }
              },
              institution: {
                connect: {
                  id: createTransactionQuery.institutionId
                }
              },
              account: {
                connect: {
                  id: createTransactionQuery.accountId
                }
              },
              location: {
                create: createTransactionQuery.location
              },
              category: {
                create: createTransactionQuery.category
              }
            }
          });
        }),
        // Update the existing transactions
        ...query.updateTransactionQueries.map((updateTransactionQuery) => {
          return this._prisma.transactionRecord.update({
            where: {
              id: updateTransactionQuery.id
            },
            include: {
              category: true,
              location: true
            },
            data: {
              amount: updateTransactionQuery.amount,
              isoCurrencyCode: updateTransactionQuery.isoCurrencyCode,
              unofficialCurrencyCode:
                updateTransactionQuery.unofficialCurrencyCode,
              checkNumber: updateTransactionQuery.checkNumber,
              date: updateTransactionQuery.date,
              name: updateTransactionQuery.name,
              merchantName: updateTransactionQuery.merchantName,
              originalDescription: updateTransactionQuery.originalDescription,
              pending: updateTransactionQuery.pending,
              pendingTransactionId: updateTransactionQuery.pendingTransactionId,
              accountOwner: updateTransactionQuery.accountOwner,
              logoUrl: updateTransactionQuery.logoUrl,
              website: updateTransactionQuery.website,
              authorizedDate: updateTransactionQuery.authorizedDate,
              authorizedDatetime: updateTransactionQuery.authorizedDatetime,
              datetime: updateTransactionQuery.datetime,
              paymentChannel: updateTransactionQuery.paymentChannel,
              code: updateTransactionQuery.code,
              merchantEntityId: updateTransactionQuery.merchantEntityId,
              location: {
                update: {
                  where: {
                    id: updateTransactionQuery.location.id
                  },
                  data: {
                    address: updateTransactionQuery.location.address,
                    city: updateTransactionQuery.location.city,
                    region: updateTransactionQuery.location.region,
                    postalCode: updateTransactionQuery.location.postalCode,
                    country: updateTransactionQuery.location.country,
                    lat: updateTransactionQuery.location.lat,
                    lon: updateTransactionQuery.location.lon,
                    storeNumber: updateTransactionQuery.location.storeNumber
                  }
                }
              },
              category: {
                update: {
                  where: {
                    id: updateTransactionQuery.category.id
                  },
                  data: {
                    originalCategory:
                      updateTransactionQuery.category.originalCategory,
                    detailed: updateTransactionQuery.category.detailed,
                    confidenceLevel:
                      updateTransactionQuery.category.confidenceLevel,
                    iconUrl: updateTransactionQuery.category.iconUrl
                  }
                }
              }
            }
          });
        }),
        // Delete the removed transactions
        ...query.deleteTransactionQueries.map((deleteTransactionQuery) => {
          return this._prisma.transactionRecord.delete({
            where: { externalId: deleteTransactionQuery.externalId },
            include: {
              category: true,
              location: true
            }
          });
        })
      ]);

    const result: SyncTransactionRecordsResponse = {
      updatedInstitutionRecord,
      createdTransactionRecords: transactionRecords.filter(
        (transactionRecord) =>
          query.createTransactionQueries.some(
            (createTransactionQuery) =>
              createTransactionQuery.externalId === transactionRecord.externalId
          )
      ),
      updatedTransactionRecords: transactionRecords.filter(
        (transactionRecord) =>
          query.updateTransactionQueries.some(
            (updateTransactionQuery) =>
              updateTransactionQuery.id === transactionRecord.id
          )
      ),
      deletedTransactionRecords: transactionRecords.filter(
        (transactionRecord) =>
          query.deleteTransactionQueries.some(
            (deleteTransactionQuery) =>
              deleteTransactionQuery.externalId === transactionRecord.externalId
          )
      )
    };
    return result;
  }

  public async getByExternalId(
    externalId: string
  ): Promise<TransactionRecord | null> {
    const transactionRecord = await this._prisma.transactionRecord.findFirst({
      include: {
        category: true,
        location: true
      },
      where: {
        externalId: externalId
      }
    });

    return transactionRecord;
  }
}
