import { Repository } from '@kaizen/core-server';
import { FindExpensesQuery, IFindExpensesRepository } from '@kaizen/finance';
import { ExpenseRecord } from '@kaizen/finance/src/expense/expense.record';

export class FindExpensesRepository
  extends Repository
  implements IFindExpensesRepository
{
  public async find(query: FindExpensesQuery): Promise<ExpenseRecord[]> {
    const expenses = await this._prisma.$queryRaw`
        SELECT * FROM transaction
        WHERE user_id = {0}
        GROUP BY 
    `;
  }
}
