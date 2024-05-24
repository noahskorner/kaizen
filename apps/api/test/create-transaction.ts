import { toSearchParams } from '@kaizen/core';
import { buildTestBed } from './build-test-bed';
import { createInstitution } from './create-institution';
import { buildAccount } from './plaid/build-account';
import { buildAccountsBalanceGetResponse } from './plaid/build-accounts-balance-get-response';
import { buildItem } from './plaid/build-item';
import { buildItemPublicTokenExchangeResponse } from './plaid/build-item-public-token-exchange-response';
import { buildTransaction } from './plaid/build-transaction';
import { buildTransactionsSyncResponse } from './plaid/build-transactions-sync-response';
import { Transaction } from '@kaizen/finance';
import supertest from 'supertest';

export const createTransaction = async () => {
  const mockItem = buildItem();
  const mockAccount = buildAccount({
    item_id: mockItem.item_id
  });
  const originalExternal = buildTransaction({
    account_id: mockAccount.account_id
  });
  const { testBed } = buildTestBed({
    itemPublicTokenExchangeResponse: buildItemPublicTokenExchangeResponse({
      item_id: mockItem.item_id
    }),
    accountsBalanceGetResponse: buildAccountsBalanceGetResponse({
      accounts: [mockAccount]
    }),
    transactionSyncResponse: buildTransactionsSyncResponse({
      added: [originalExternal]
    })
  });
  const { authToken } = await createInstitution(testBed);
  const findTransactionsResponse = await supertest(testBed)
    .get(`/transaction?${toSearchParams({ page: 1 })}`)
    .auth(authToken.accessToken, { type: 'bearer' });
  const transaction: Transaction = findTransactionsResponse.body.data.hits[0];

  return {
    testBed: testBed,
    authToken: authToken,
    transactionId: transaction.id
  };
};
