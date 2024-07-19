// eslint-disable-next-line no-restricted-imports
import { PrismaClient } from '@prisma/client';
import { environment } from './env';
import {
  GetSecretValueCommand,
  SecretsManagerClient
} from '@aws-sdk/client-secrets-manager';

const getDatabaseUrl = async (): Promise<string> => {
  if (environment.AWS_REGION == null) {
    throw new Error(
      `Must provide AWS_REGION. Did you forget to set it in your environment file?`
    );
  }
  const client = new SecretsManagerClient({ region: environment.AWS_REGION });

  try {
    if (environment.AWS_DATABASE_SECRET_ID == null) {
      throw new Error(
        `Must provide AWS_DATABASE_SECRET_ID. Did you forget to set it in your environment file?`
      );
    }
    const command = new GetSecretValueCommand({
      SecretId: environment.AWS_DATABASE_SECRET_ID
    });
    const response = await client.send(command);
    const secret = JSON.parse(response.SecretString || '{}');
    const username = secret.username;
    const password = secret.password;
    const host = secret.host;
    const databaseName = secret.dbname;
    const port = secret.port;

    return `postgresql://${username}:${password}@${host}:${port}/${databaseName}?schema=public`;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createPrismaClient = async (): Promise<PrismaClient> => {
  if (['DEVELOPMENT', 'TEST'].includes(environment.NODE_ENV)) {
    return new PrismaClient();
  }

  const databaseUrl = await getDatabaseUrl();
  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl
      }
    }
  });
};
