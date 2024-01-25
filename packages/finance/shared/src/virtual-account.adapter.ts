import { CreateVirtualAccountCommand } from './create-virtual-account/create-virtual-account.command';
import { CreateVirtualAccountQuery } from './create-virtual-account/create-virtual-account.query';
import { VirtualAccount } from './virtual-account';
import { VirtualAccountFrequency } from './virtual-account-frequency';
import { VirtualAccountRecord } from './virtual-account-record';
import { VirtualAccountRecordFrequency } from './virtual-account-record-frequency';

export class VirtualAccountAdapter {
  public static toCreateVirtualAccountQuery(
    command: CreateVirtualAccountCommand
  ): CreateVirtualAccountQuery {
    const query: CreateVirtualAccountQuery = {
      userId: command.userId,
      name: command.name,
      balance: command.balance,
      amount: command.amount,
      currency: 'USD', // TODO: Hardcoding this to USD for now
      frequency: VirtualAccountAdapter.toVirtualAccountRecordFrequency(
        command.frequency
      )
    };

    return query;
  }

  public static toVirtualAccountRecordFrequency(
    frequency: VirtualAccountFrequency
  ) {
    switch (frequency) {
      case VirtualAccountFrequency.Weekly:
        return VirtualAccountRecordFrequency.Weekly;
      case VirtualAccountFrequency.Biweekly:
        return VirtualAccountRecordFrequency.Biweekly;
      case VirtualAccountFrequency.Monthly:
        return VirtualAccountRecordFrequency.Monthly;
      default:
        return VirtualAccountRecordFrequency.Monthly;
    }
  }

  public static toVirtualAccount(
    virtualAccountRecord: VirtualAccountRecord
  ): VirtualAccount {
    const virtualAccount: VirtualAccount = {
      id: virtualAccountRecord.id,
      name: virtualAccountRecord.name,
      createdAt: virtualAccountRecord.createdAt.toISOString(),
      balance: virtualAccountRecord.balance,
      amount: virtualAccountRecord.amount,
      currency: virtualAccountRecord.currency,
      frequency: VirtualAccountAdapter.toVirtualAccountFrequency(
        virtualAccountRecord.frequency
      )
    };

    return virtualAccount;
  }

  public static toVirtualAccountFrequency(
    frequency: VirtualAccountRecordFrequency
  ): VirtualAccountFrequency {
    switch (frequency) {
      case VirtualAccountRecordFrequency.Weekly:
        return VirtualAccountFrequency.Weekly;
      case VirtualAccountRecordFrequency.Biweekly:
        return VirtualAccountFrequency.Biweekly;
      case VirtualAccountRecordFrequency.Monthly:
        return VirtualAccountFrequency.Monthly;
      default:
        return VirtualAccountFrequency.Monthly;
    }
  }
}
