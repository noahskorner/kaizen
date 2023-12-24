import { Repository } from '@kaizen/core-server';
import {
  VirtualAccountRecord,
  ICreateVirtualAccountRepository,
  CreateVirtualAccountQuery
} from '@kaizen/finance';

export class CreateVirtualAccountRepository
  extends Repository
  implements ICreateVirtualAccountRepository
{
  public async create(
    query: CreateVirtualAccountQuery
  ): Promise<VirtualAccountRecord> {
    return await this._prisma.virtualAccountRecord.create({
      data: query
    });
  }
}
