import { Repository } from '@kaizen/core-server';
import { DeleteAccountQuery, IDeleteAccountRepository } from '@kaizen/finance';

export class DeleteAccountRepository
  extends Repository
  implements IDeleteAccountRepository
{
  public async delete(request: DeleteAccountQuery): Promise<boolean> {
    await this._prisma.$transaction(async (prisma) => {
      // Delete the associated transactions
      await prisma.transactionRecord.deleteMany({
        where: {
          accountId: request.accountId
        }
      });

      // Delete the account history
      await prisma.accountHistoryRecord.deleteMany({
        where: {
          accountId: request.accountId
        }
      });

      // Delete the account
      const { institutionId } = await prisma.accountRecord.delete({
        where: {
          id: request.accountId
        }
      });

      // If that was the last account, we need to delete the institution as well
      const accounts = await this._prisma.accountRecord.count({
        where: { institutionId }
      });
      // The above delete has not been committed yet, hence === 1
      if (accounts === 1) {
        await prisma.institutionRecord.delete({
          where: {
            id: institutionId
          }
        });
      }
    });

    return true;
  }
}
