import { serverEnvironment } from '@kaizen/env-server';
import { mockPlaidApi } from '../fixtures/mock-plaid-client';
import { IServiceCollection } from './service-collection.interface';
import { createServiceCollection } from './service-collection';

export const createServiceCollectionFixture = (
  serviceCollectionFixture: Partial<IServiceCollection> = {}
) => {
  const environment = serviceCollectionFixture.environment ?? serverEnvironment;
  const plaid = serviceCollectionFixture.plaid ?? mockPlaidApi;

  return createServiceCollection({ environment, plaid });
};
