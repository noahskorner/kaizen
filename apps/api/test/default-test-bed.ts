import { MockPlaidApiBuilder } from './plaid/mock-plaid-api.builder';
import { ServiceCollectionBuilder } from '../src/service-collection.builder';
import { AppBuilder } from '../src/app-builder';
import { cachedPrismaClient } from './build-test-bed';
import { LocalExchangeRateProvider } from '@kaizen/finance-server';

const mockPlaidApi = new MockPlaidApiBuilder().build();
const localExchangeRateProvider = new LocalExchangeRateProvider();

export const defaultTestServiceCollection = new ServiceCollectionBuilder()
  .withPrisma(cachedPrismaClient)
  .withPlaidApi(mockPlaidApi)
  .withExchangeRateProvider(localExchangeRateProvider)
  .build();

export const defaultTestBed = new AppBuilder()
  .withServiceCollection(defaultTestServiceCollection)
  .build();
