import { serverEnvironment } from '@kaizen/env-server';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

export const plaidClient = new PlaidApi(
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
