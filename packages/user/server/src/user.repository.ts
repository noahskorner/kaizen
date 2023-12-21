import { prisma, UserRecord } from '@kaizen/data';

export class UserRepository {
  public async get(userId: string): Promise<UserRecord | null> {
    return await prisma.userRecord.findUnique({
      where: {
        id: userId
      }
    });
  }

  public async findByEmail(email: string): Promise<UserRecord | null> {
    return await prisma.userRecord.findUnique({
      where: {
        email: email
      }
    });
  }

  public async create(email: string, password: string): Promise<UserRecord> {
    return await prisma.userRecord.create({
      data: {
        email: email,
        password: password
      }
    });
  }
}
