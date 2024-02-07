import {
  ApiError,
  ApiResponse,
  DEFAULT_PAGE_SIZE,
  Errors,
  Paginated
} from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  FindTransactionsCommand,
  IFindTransactionsRepository,
  IFindTransactionsService,
  Transaction,
  TransactionAdapter
} from '@kaizen/finance';

export class FindTransactionsService
  extends Service
  implements IFindTransactionsService
{
  constructor(
    private readonly _findTransactionsRepository: IFindTransactionsRepository
  ) {
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
      await this._findTransactionsRepository.find({
        userId: command.userId,
        page: command.page,
        pageSize: command.pageSize ?? DEFAULT_PAGE_SIZE,
        startDate: command.startDate,
        endDate: command.endDate
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

    const validStartDate =
      command.startDate == null || !isNaN(Date.parse(command.startDate));
    if (!validStartDate) {
      errors.push(Errors.FIND_TRANSACTIONS_INVALID_START_DATE);
    }

    if (command.endDate != null) {
      if (isNaN(Date.parse(command.endDate))) {
        errors.push(Errors.FIND_TRANSACTIONS_INVALID_END_DATE);
      } else if (
        validStartDate &&
        Date.parse(command.endDate) < Date.parse(command.startDate!)
      ) {
        errors.push(Errors.FIND_TRANSACTIONS_INVALID_TIMEFRAME);
      }
    }

    return errors;
  }
}
