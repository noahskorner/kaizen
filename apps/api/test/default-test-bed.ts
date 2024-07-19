import { MockPlaidApiBuilder } from './plaid/mock-plaid-api.builder';
import { ServiceCollectionBuilder } from '../src/service-collection.builder';
import { AppBuilder } from '../src/app-builder';
import { cachedPrismaClient } from './build-test-bed';

const mockPlaidApi = new MockPlaidApiBuilder().build();

export const defaultTestServiceCollection = new ServiceCollectionBuilder()
  .withPrisma(cachedPrismaClient)
  .withPlaidApi(mockPlaidApi)
  .build();

export const defaultTestBed = new AppBuilder()
  .withServiceCollection(defaultTestServiceCollection)
  .build();
