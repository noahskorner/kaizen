import { Repository } from '@kaizen/core-server';
import { FindExpensesQuery, IFindExpensesRepository } from '@kaizen/finance';
import { ExpenseRecord } from '@kaizen/finance/src/expense/expense.record';

export class FindExpensesRepository
  extends Repository
  implements IFindExpensesRepository
{
  public async find(query: FindExpensesQuery): Promise<ExpenseRecord[]> {
    const expenses = await this._prisma.$queryRaw`
      SELECT "category"."primary" as "category", SUM("transaction"."amount") as "amount"
      FROM "category"
      JOIN "transaction" on "transaction"."category_id" = "category"."id"
      WHERE "transaction"."user_id" = ${query.userId}
      GROUP BY "category"."primary";
    `;

    return expenses as ExpenseRecord[];
  }
}
