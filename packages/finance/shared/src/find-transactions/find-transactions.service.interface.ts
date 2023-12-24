import { ApiResponse, Paginated } from '@kaizen/core';
import { FindTransactionsCommand } from './find-transactions.command';
import { Transaction } from '../transaction';

export interface IFindTransactionsService {
  find(
    command: FindTransactionsCommand
  ): Promise<ApiResponse<Paginated<Transaction>>>;
}
