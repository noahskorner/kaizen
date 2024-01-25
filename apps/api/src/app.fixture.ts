import { createApp } from './app';
import { createServiceCollection } from './routes/service-collection';
import { mockPlaidApi } from './fixtures/mock-plaid-client';

const mockServiceCollection = createServiceCollection({ plaid: mockPlaidApi });
export const appFixture = createApp(mockServiceCollection);
