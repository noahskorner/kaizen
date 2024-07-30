import { Repository } from '@kaizen/core-server';
import {
  ISyncTransactionsRepository,
  SyncTransactionRecordsResponse,
  SyncTransactionsQuery
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
            plaidCursor: query.syncInstitutionQuery.cursor
          },
          where: {
            id: query.syncInstitutionQuery.institutionId
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
              originalAmount: createTransactionQuery.originalAmount,
              isoCurrencyCode: createTransactionQuery.isoCurrencyCode,
              unofficialCurrencyCode:
                createTransactionQuery.unofficialCurrencyCode,
              checkNumber: createTransactionQuery.checkNumber,
              date: createTransactionQuery.date,
              originalName: createTransactionQuery.originalName,
              originalMerchantName: createTransactionQuery.originalMerchantName,
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
              originalCategory: createTransactionQuery.originalCategory,
              originalDetailed: createTransactionQuery.originalDetailed,
              originalConfidenceLevel:
                createTransactionQuery.originalConfidenceLevel,
              originalIconUrl: createTransactionQuery.originalIconUrl,
              amount: createTransactionQuery.amount,
              name: createTransactionQuery.name,
              merchantName: createTransactionQuery.merchantName,
              description: createTransactionQuery.description
            }
          });
        }),
        // Update the existing transactions
        ...query.syncTransactionQueries.map((updateTransactionQuery) => {
          return this._prisma.transactionRecord.update({
            where: {
              id: updateTransactionQuery.id
            },
            include: {
              category: true,
              location: true
            },
            data: {
              originalAmount: updateTransactionQuery.originalAmount,
              isoCurrencyCode: updateTransactionQuery.isoCurrencyCode,
              unofficialCurrencyCode:
                updateTransactionQuery.unofficialCurrencyCode,
              checkNumber: updateTransactionQuery.checkNumber,
              date: updateTransactionQuery.date,
              originalName: updateTransactionQuery.originalName,
              originalMerchantName: updateTransactionQuery.originalMerchantName,
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
              originalCategory: updateTransactionQuery.originalCategory,
              originalDetailed: updateTransactionQuery.originalDetailed,
              originalConfidenceLevel:
                updateTransactionQuery.originalConfidenceLevel,
              originalIconUrl: updateTransactionQuery.originalIconUrl,
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
              name: updateTransactionQuery.name,
              amount: updateTransactionQuery.amount,
              merchantName: updateTransactionQuery.merchantName,
              description: updateTransactionQuery.description
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
          query.syncTransactionQueries.some(
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
}
