import { FindExpensesCommand } from './find-expenses.command';

export type FindExpensesRequest = Omit<FindExpensesCommand, 'userId'>;
