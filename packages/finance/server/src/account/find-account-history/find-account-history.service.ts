import {
  ErrorCode,
  FindAccountHistoryInvalidEndDateError,
  FindAccountHistoryInvalidPageError,
  FindAccountHistoryInvalidPageSizeError,
  FindAccountHistoryInvalidStartDateError,
  FindAccountHistoryInvalidTimeframeError,
  Paginated,
  ServiceError,
  ServiceResponse
} from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  AccountHistory,
  AccountHistoryAdapter,
  FindAccountHistoryCommand,
  FindAccountHistoryQuery,
  IFindAccountHistoryRepository,
  IFindAccountHistoryService
} from '@kaizen/finance';

export class FindAccountHistoryService
  extends Service
  implements IFindAccountHistoryService
{
  constructor(
    private readonly _findAccountHistoryRepository: IFindAccountHistoryRepository
  ) {
    super();
  }

  public async find(
    command: FindAccountHistoryCommand
  ): Promise<ServiceResponse<Paginated<AccountHistory>>> {
    const errors = this.validate(command);
    if (errors.length > 0) {
      return this.failures(errors);
    }

    const paginatedAccountHistoryRecords =
      await this._findAccountHistoryRepository.find(
        command satisfies FindAccountHistoryQuery
      );

    return this.success({
      total: paginatedAccountHistoryRecords.total,
      hits: paginatedAccountHistoryRecords.hits.map(
        AccountHistoryAdapter.toAccountHistory
      )
    } satisfies Paginated<AccountHistory>);
  }

  private validate(command: FindAccountHistoryCommand) {
    const errors: ServiceError[] = [];

    if (isNaN(command.page)) {
      errors.push({
        code: ErrorCode.FIND_ACCOUNT_HISTORY_INVALID_PAGE,
        params: {
          userId: command.userId,
          page: command.page
        }
      } satisfies FindAccountHistoryInvalidPageError);
    } else if (command.page <= 0) {
      errors.push({
        code: ErrorCode.FIND_ACCOUNT_HISTORY_INVALID_PAGE,
        params: {
          userId: command.userId,
          page: command.page
        }
      } satisfies FindAccountHistoryInvalidPageError);
    }

    if (command.pageSize != null && isNaN(command.pageSize)) {
      errors.push({
        code: ErrorCode.FIND_ACCOUNT_HISTORY_INVALID_PAGE_SIZE,
        params: {
          userId: command.userId,
          pageSize: command.pageSize
        }
      } satisfies FindAccountHistoryInvalidPageSizeError);
    }

    const validStartDate =
      command.startDate == null || !isNaN(Date.parse(command.startDate));
    if (!validStartDate) {
      errors.push({
        code: ErrorCode.FIND_ACCOUNT_HISTORY_INVALID_START_DATE,
        params: {
          userId: command.userId,
          startDate: command.startDate
        }
      } satisfies FindAccountHistoryInvalidStartDateError);
    }

    if (command.endDate != null) {
      if (isNaN(Date.parse(command.endDate))) {
        errors.push({
          code: ErrorCode.FIND_ACCOUNT_HISTORY_INVALID_END_DATE,
          params: {
            userId: command.userId,
            endDate: command.endDate
          }
        } satisfies FindAccountHistoryInvalidEndDateError);
      } else if (
        validStartDate &&
        Date.parse(command.endDate) < Date.parse(command.startDate!)
      ) {
        errors.push({
          code: ErrorCode.FIND_ACCOUNT_HISTORY_INVALID_TIMEFRAME,
          params: {
            userId: command.userId,
            startDate: command.startDate,
            endDate: command.endDate
          }
        } satisfies FindAccountHistoryInvalidTimeframeError);
      }
    }

    return errors;
  }
}
