import {
  ApiError,
  ApiResponse,
  DEFAULT_PAGE_SIZE,
  Errors,
  Paginated
} from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import { FindTransactionsCommand } from './find-transactions.command';
import { Transaction } from '@kaizen/finance';
import { TransactionRepository } from '@kaizen/core-server';
import { TransactionAdapter } from '../transaction.adapter';

export class FindTransactionsService extends Service {
  constructor(private readonly _transactionRepository: TransactionRepository) {
    super();
  }

  public async find(
    command: FindTransactionsCommand
  ): Promise<ApiResponse<Paginated<Transaction>>> {
    const errors = this.validate(command);
    if (errors.length > 0) {
      return this.failures(errors);
    }

    const paginatedTransactionRecords =
      await this._transactionRepository.findAll({
        userId: command.userId,
        page: command.page,
        pageSize: command.pageSize ?? DEFAULT_PAGE_SIZE
      });

    const response = {
      total: paginatedTransactionRecords.total,
      hits: paginatedTransactionRecords.hits.map(
        TransactionAdapter.toTransaction
      )
    };
    return this.success(response);
  }

  private validate(command: FindTransactionsCommand) {
    const errors: ApiError[] = [];

    if (isNaN(command.page)) {
      errors.push(Errors.FIND_TRANSACTIONS_INVALID_PAGE);
    } else if (command.page <= 0) {
      errors.push(Errors.FIND_TRANSACTIONS_INVALID_PAGE);
    }

    if (command.pageSize != null && isNaN(command.pageSize)) {
      errors.push(Errors.FIND_TRANSACTIONS_INVALID_PAGE_SIZE);
    }

    return errors;
  }
}
