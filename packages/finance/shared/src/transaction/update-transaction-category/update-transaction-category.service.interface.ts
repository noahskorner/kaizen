import { ServiceResponse } from '@kaizen/core';
import { UpdateTransactionCategoryCommand } from './update-transaction-category.command';
import { Transaction } from '../transaction';

export interface IUpdateTransactionCategoryService {
  update(
    command: UpdateTransactionCategoryCommand
  ): Promise<ServiceResponse<Transaction>>;
}
