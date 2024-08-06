import { Repository } from '@kaizen/core-server';
import {
  BulkDeleteTransactionCategoryQuery,
  BulkDeleteTransactionCategoryResponse,
  IDeleteTransactionCategoryRepository
} from '@kaizen/finance';

export class DeleteTransactionCategoryRepository
  extends Repository
  implements IDeleteTransactionCategoryRepository
{
  public async bulkDelete(
    query: BulkDeleteTransactionCategoryQuery
  ): Promise<BulkDeleteTransactionCategoryResponse> {
    const response = await this._prisma.transactionCategoryRecord.deleteMany({
      where: {
        id: {
          in: query.ids
        }
      }
    });

    return {
      count: response.count
    } satisfies BulkDeleteTransactionCategoryResponse;
  }
}
