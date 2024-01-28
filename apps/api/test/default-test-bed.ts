import { MockPlaidApiBuilder } from './plaid/mock-plaid-api.builder';
import { ServiceCollectionBuilder } from '../src/service-collection.builder';
import { buildApp } from '../src/build-app';

const mockPlaidApi = new MockPlaidApiBuilder().build();

const mockServiceCollection = new ServiceCollectionBuilder()
  .withPlaidApi(mockPlaidApi)
  .build();

export const defaultTestBed = buildApp(mockServiceCollection);
