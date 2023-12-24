// eslint-disable-next-line no-restricted-imports
import { AccountRecordType, PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';

/* eslint-disable @typescript-eslint/no-var-requires */
interface Config {
  user: {
    email: string;
    password: string;
  };
}

const hashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt();
  return await hash(password, salt);
};

export const seed = async () => {
  const prisma = new PrismaClient();
  const config: Config = require('./local.json');
  console.log('Seeding...');

  // Create user
  console.log(`Seeding user ${config.user.email}...`);
  const user = await prisma.userRecord.create({
    data: {
      email: config.user.email,
      password: await hashPassword(config.user.password)
    }
  });

  // Create institutions
  console.log(`Seeding institution...`);
  const institution = await prisma.institutionRecord.create({
    data: {
      plaidAccessToken: 'access-sandbox-3b091211-f4e8-4742-9f78-ea71a4329792',
      userId: user.id
    }
  });

  // Create accounts
  console.log(`Seeding accounts...`);
  await prisma.accountRecord.createMany({
    data: [
      {
        externalId: 'zPe8Pdv9a9IMxRZJ5ErNhPGA5gK1M5flDv4XA',
        institutionId: institution.id,
        current: 110,
        available: 100,
        type: AccountRecordType.Depository
      },
      {
        externalId: 'BGj8GzJ9D9ILyla6bGepSX8NJGgpoJc4qKDxD',
        institutionId: institution.id,
        current: 210,
        available: 200,
        type: AccountRecordType.Depository
      },
      {
        externalId: '3jRajeMdGdSN4yxaqoMLFl1w4Pk8D4CZG1dV4',
        institutionId: institution.id,
        current: 1000,
        available: 0,
        type: AccountRecordType.Depository
      },
      {
        externalId: 'x4jo43v5g5HXL3eM76KNC74e3mZ1G3C6mGdKl',
        institutionId: institution.id,
        current: 410,
        available: 0,
        type: AccountRecordType.Credit
      },
      {
        externalId: 'dWLKWP18D8tkxDr59yQ1hlQjMyB3zMCJoWLy4',
        institutionId: institution.id,
        current: 43200,
        available: 43200,
        type: AccountRecordType.Depository
      },
      {
        externalId: 'agZAgaQ9B9TKzyLEgnM1HAMB58k9R5iZpWA68',
        institutionId: institution.id,
        current: 320.76,
        available: 0,
        type: AccountRecordType.Investment
      },
      {
        externalId: '47R47Q1GaGS5NMP6KLz4hb5gR7XPVRtJ81jpB',
        institutionId: institution.id,
        current: 23631.9805,
        available: 0,
        type: AccountRecordType.Investment
      },
      {
        externalId: 'NzEdzQJg7ghwPNpLJ4jXTMjqZDXlVZiyLDP8g',
        institutionId: institution.id,
        current: 65262,
        available: 0,
        type: AccountRecordType.Loan
      },
      {
        externalId: '5elNeZk646CRPaLMr8ZecKkVdajwzdu5zPqXA',
        institutionId: institution.id,
        current: 56302.06,
        available: 0,
        type: AccountRecordType.Loan
      }
    ]
  });

  console.log('Seeding complete!');
};

seed();
