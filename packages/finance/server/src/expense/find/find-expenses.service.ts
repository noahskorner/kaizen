import { ErrorCode, ServiceError, ServiceResponse } from '@kaizen/core';
import { Service } from '@kaizen/core-server';
import {
  Expense,
  FindExpensesCommand,
  IFindExpensesRepository,
  IFindExpensesService
} from '@kaizen/finance';

export class FindExpensesService
  extends Service
  implements IFindExpensesService
{
  constructor(
    private readonly findExpensesRepository: IFindExpensesRepository
  ) {
    super();
  }

  public async find(
    command: FindExpensesCommand
  ): Promise<ServiceResponse<Expense[]>> {
    const errors = this.validate(command);
    if (errors.length) {
      return this.failures(errors);
    }

    const expenses = await this.findExpensesRepository.find(command);
    return this.success(expenses);
  }

  private validate(command: FindExpensesCommand) {
    const errors: ServiceError[] = [];

    const validStartDate =
      command.startDate != null && !isNaN(Date.parse(command.startDate));
    if (!validStartDate) {
      errors.push({
        code: ErrorCode.FIND_EXPENSES_INVALID_START_DATE,
        params: {
          startDate: command.startDate
        }
      });
    }

    if (isNaN(Date.parse(command.endDate))) {
      errors.push({
        code: ErrorCode.FIND_EXPENSES_INVALID_END_DATE,
        params: {
          endDate: command.endDate
        }
      });
    } else if (
      validStartDate &&
      Date.parse(command.endDate) < Date.parse(command.startDate!)
    ) {
      errors.push({
        code: ErrorCode.FIND_EXPENSES_INVALID_TIMEFRAME,
        params: {
          startDate: command.startDate,
          endDate: command.endDate
        }
      });
    }

    return errors;
  }
}
