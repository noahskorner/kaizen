import { prisma } from '../_prisma';
import { VirtualAccountRecord } from '../virtual-account-record';
import { CreateVirtualAccountQuery } from './create-virutal-account.query';

export class CreateVirtualAccountRepository {
  public async create(
    query: CreateVirtualAccountQuery
  ): Promise<VirtualAccountRecord> {
    return await prisma.virtualAccountRecord.create({
      data: query
    });
  }
}
