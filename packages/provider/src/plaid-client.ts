import { serverEnvironment } from '@kaizen/env-server';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { mockPlaidApi } from './mock-plaid-client';

export const plaidClient =
  serverEnvironment.NODE_ENV === 'TEST'
    ? mockPlaidApi
    : new PlaidApi(
        new Configuration({
          basePath: PlaidEnvironments.sandbox,
          baseOptions: {
            headers: {
              'PLAID-CLIENT-ID': serverEnvironment.PLAID_CLIENT_ID,
              'PLAID-SECRET': serverEnvironment.PLAID_SECRET
            }
          }
        })
      );
