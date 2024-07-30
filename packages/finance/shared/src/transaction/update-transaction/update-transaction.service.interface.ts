import { ServiceResponse } from '@kaizen/core';
import { UpdateTransactionCommand } from './update-transaction.command';
import { Transaction } from '../transaction';

export interface IUpdateTransactionService {
  update(
    command: UpdateTransactionCommand
  ): Promise<ServiceResponse<Transaction>>;
}
