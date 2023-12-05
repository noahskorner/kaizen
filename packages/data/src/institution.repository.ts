import { FindAllInstitutionsQuery } from './find-all-institutions.query';
import { prisma } from './prisma';
import { InstitutionRecord } from '@prisma/client';

export class InstitutionRepository {
  public async create(
    userId: string,
    plaidAccessToken: string
  ): Promise<InstitutionRecord> {
    return await prisma.institutionRecord.create({
      data: {
        userId,
        plaidAccessToken
      }
    });
  }

  public async findAll(
    query: FindAllInstitutionsQuery
  ): Promise<InstitutionRecord[]> {
    return await prisma.institutionRecord.findMany({
      where: {
        userId: query.userId
      }
    });
  }

  public async get(id: string): Promise<InstitutionRecord | null> {
    return await prisma.institutionRecord.findUnique({
      where: {
        id
      }
    });
  }
}
