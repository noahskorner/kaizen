import { ServiceResponse } from '@kaizen/core';
import { Expense } from '../expense';
import { FindExpensesCommand } from './find-expenses.command';

export interface IFindExpensesService {
  find(command: FindExpensesCommand): Promise<ServiceResponse<Expense[]>>;
}
