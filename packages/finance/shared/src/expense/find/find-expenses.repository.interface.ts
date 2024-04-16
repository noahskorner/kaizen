import { ExpenseRecord } from '../expense.record';
import { FindExpensesQuery } from './find-expenses.query';

export interface IFindExpensesRepository {
  find(query: FindExpensesQuery): Promise<ExpenseRecord[]>;
}
