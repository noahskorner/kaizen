import { PrismaClient } from '@prisma/client';

export abstract class Repository {
  constructor(protected readonly _prisma: PrismaClient) {}
}
