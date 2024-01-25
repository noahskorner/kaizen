import { createApp } from './app';
import { createServiceCollection } from './routes/service-collection';
import { mockPlaidApi } from './fixtures/mock-plaid-client';

/**
 * Want to override a dependency?
 *
 * ```ts
 * // Override your dependency
 * const serviceCollectionFixture = createServiceCollectionFixture({
 *   environment: {
 *     ...serverEnvironment,
 *     REFRESH_TOKEN_EXPIRATION: '0s'
 *   }
 * });
 *
 * // Create your test bed
 * const appFixture = createApp(serviceCollectionFixture);
 *
 * // Remember to also override the defaultAppFixture in helper functions
 * const { authToken } = await createAndLoginUser(appFixture);
 *
 * // Use your test bed
 * const response = await supertest(appFixture)
 * ```
 */

export const defaultAppFixture = createApp(
  createServiceCollection({ plaid: mockPlaidApi })
);
