import supertest from 'supertest';
import {
  ApiSuccessResponse,
  DEFAULT_PAGE_SIZE,
  ErrorKey,
  Paginated,
  range,
  toSearchParams
} from '@kaizen/core';
import { FindTransactionsRequest, Transaction } from '@kaizen/finance';
import { createAndLoginUser } from '../../../../test/create-and-login-user';
import {
  expectError,
  createInstitution,
  buildTransactionsSyncResponse,
  buildTransaction,
  buildAccount,
  buildAccountsBalanceGetResponse,
  buildItem,
  buildItemPublicTokenExchangeResponse
} from '../../../../test';
import { buildSut } from '../../../../test/build-sut';
import { Transaction as PlaidTransaction } from 'plaid';

const expectTransactionToBeExternal = (
  transaction: Transaction,
  external: PlaidTransaction
) => {
  expect(transaction.id).toBeDefined();
  expect(transaction.externalId).toBe(external.transaction_id);
  expect(transaction.accountId).toBeDefined();
  expect(transaction.externalAccountId).toBe(external.account_id);
  expect(transaction.amount).toBe(external.amount);
  expect(transaction.currency).toBe(external.iso_currency_code);
  expect(transaction.date).toBe(external.authorized_datetime);
  expect(transaction.name).toBe(external.name);
  expect(transaction.merchantName).toBe(external.merchant_name);
  expect(transaction.pending).toBe(external.pending);
  expect(transaction.logoUrl).toBe(external.logo_url);
};

describe('/transaction', () => {
  describe('find should', () => {
    it('returns 400 when page not provided', async () => {
      // Arrange
      const { sut } = buildSut();
      const { authToken } = await createAndLoginUser(sut);

      // Act
      const response = await supertest(sut)
        .get('/transaction')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(400);
      expectError(response, ErrorKey.FIND_TRANSACTIONS_INVALID_PAGE);
    });
    it('returns 400 when page not valid', async () => {
      // Arrange
      const { sut } = buildSut();
      const { authToken } = await createAndLoginUser(sut);
      const request: FindTransactionsRequest = {
        page: 0
      };

      // Act
      const response = await supertest(sut)
        .get(`/transaction?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(400);
      expectError(response, ErrorKey.FIND_TRANSACTIONS_INVALID_PAGE);
    });
    it('returns 400 when pageSize not valid', async () => {
      // Arrange
      const { sut } = buildSut();
      const { authToken } = await createAndLoginUser(sut);
      const request: Omit<FindTransactionsRequest, 'pageSize'> & {
        pageSize: null;
      } = {
        page: 1,
        pageSize: null
      };

      // Act
      const response = await supertest(sut)
        .get(`/transaction?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(400);
      expectError(response, ErrorKey.FIND_TRANSACTIONS_INVALID_PAGE_SIZE);
    });
    it('returns 200 and default page size when no page size provided', async () => {
      // Arrange
      const mockItem = buildItem();
      const mockAccount = buildAccount({
        item_id: mockItem.item_id
      });
      const mockTransactions = range(11).map(() =>
        buildTransaction({ account_id: mockAccount.account_id })
      );
      const { sut } = buildSut({
        itemPublicTokenExchangeResponse: buildItemPublicTokenExchangeResponse({
          item_id: mockItem.item_id
        }),
        accountsBalanceGetResponse: buildAccountsBalanceGetResponse({
          accounts: [mockAccount]
        }),
        transactionSyncResponse: buildTransactionsSyncResponse({
          added: mockTransactions
        })
      });
      const { authToken } = await createInstitution(sut);
      const request: FindTransactionsRequest = {
        page: 1
      };

      // Act
      const response = await supertest(sut)
        .get(`/transaction?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });
      const body: ApiSuccessResponse<Paginated<Transaction>> = response.body;

      // Asserts
      expect(response.status).toBe(200);
      expect(body.data.hits.length).toBe(DEFAULT_PAGE_SIZE);
      expect(body.data.total).toBe(mockTransactions.length);
      body.data.hits.forEach((transaction) => {
        const external = mockTransactions.find(
          (external) => external.transaction_id === transaction.externalId
        );
        expect(external).toBeDefined();
        if (external) {
          expectTransactionToBeExternal(transaction, external);
        }
      });
    });
    it('returns 200 and custom page size', async () => {
      // Arrange
      const mockItem = buildItem();
      const mockAccount = buildAccount({
        item_id: mockItem.item_id
      });
      const mockTransactions = range(11).map(() =>
        buildTransaction({ account_id: mockAccount.account_id })
      );
      const { sut } = buildSut({
        itemPublicTokenExchangeResponse: buildItemPublicTokenExchangeResponse({
          item_id: mockItem.item_id
        }),
        accountsBalanceGetResponse: buildAccountsBalanceGetResponse({
          accounts: [mockAccount]
        }),
        transactionSyncResponse: buildTransactionsSyncResponse({
          added: mockTransactions
        })
      });
      const { authToken } = await createInstitution(sut);
      const pageSize = 7;
      const request: FindTransactionsRequest = {
        page: 1,
        pageSize: pageSize
      };

      // Act
      const response = await supertest(sut)
        .get(`/transaction?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });
      const body: ApiSuccessResponse<Paginated<Transaction>> = response.body;

      // Asserts
      expect(response.status).toBe(200);
      expect(body.data.hits.length).toBe(pageSize);
      expect(body.data.total).toBe(mockTransactions.length);
      expect(body.data.total).toBe(mockTransactions.length);
      body.data.hits.forEach((transaction) => {
        const external = mockTransactions.find(
          (external) => external.transaction_id === transaction.externalId
        );
        expect(external).toBeDefined();
        if (external) {
          expectTransactionToBeExternal(transaction, external);
        }
      });
    });
    it('returns 200 and transactions ordered by authorizedDate', async () => {
      // Arrange
      const mockItem = buildItem();
      const mockAccount = buildAccount({
        item_id: mockItem.item_id
      });
      const mockTransactions = range(16).map((index) =>
        buildTransaction({
          account_id: mockAccount.account_id,
          date: new Date(1998, 1, index + 1).toISOString()
        })
      );
      const { sut } = buildSut({
        itemPublicTokenExchangeResponse: buildItemPublicTokenExchangeResponse({
          item_id: mockItem.item_id
        }),
        accountsBalanceGetResponse: buildAccountsBalanceGetResponse({
          accounts: [mockAccount]
        }),
        transactionSyncResponse: buildTransactionsSyncResponse({
          added: mockTransactions
        })
      });
      const { authToken } = await createInstitution(sut);
      const request: FindTransactionsRequest = {
        page: 1,
        pageSize: 15
      };

      // Act
      const response = await supertest(sut)
        .get(`/transaction?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });
      const body: ApiSuccessResponse<Paginated<Transaction>> = response.body;

      // Asserts
      expect(response.status).toBe(200);
      expect(body.data.total).toBe(mockTransactions.length);
      expect(body.data.hits.length).toBe(request.pageSize);
      const sortedHits = [...body.data.hits].sort((a, b) => {
        if (a.date == null) return -1;
        if (b.date == null) return 1;

        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      expect(body.data.hits).toEqual(sortedHits);
      expect(body.data.total).toBe(mockTransactions.length);
      body.data.hits.forEach((transaction) => {
        const external = mockTransactions.find(
          (external) => external.transaction_id === transaction.externalId
        );
        expect(external).toBeDefined();
        if (external) {
          expectTransactionToBeExternal(transaction, external);
        }
      });
    });
    it('returns 200 and created transactions after sync', async () => {
      // Arrange

      // Create original item, account, and transaction
      const mockItem = buildItem();
      const mockAccount = buildAccount({
        item_id: mockItem.item_id
      });
      const originalExternal = buildTransaction({
        account_id: mockAccount.account_id
      });
      let { sut } = buildSut({
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
      const { authToken } = await createInstitution(sut);

      // Sync institutions
      const createdExternal = buildTransaction({
        account_id: mockAccount.account_id
      });
      sut = buildSut({
        itemPublicTokenExchangeResponse: buildItemPublicTokenExchangeResponse({
          item_id: mockItem.item_id
        }),
        accountsBalanceGetResponse: buildAccountsBalanceGetResponse({
          accounts: [mockAccount]
        }),
        transactionSyncResponse: buildTransactionsSyncResponse({
          added: [createdExternal]
        })
      }).sut;
      await supertest(sut)
        .put('/institution/sync')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Build request
      const pageSize = 2;
      const request: FindTransactionsRequest = {
        page: 1,
        pageSize: pageSize
      };

      // Act
      const response = await supertest(sut)
        .get(`/transaction?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });
      const body: ApiSuccessResponse<Paginated<Transaction>> = response.body;

      // Asserts
      expect(response.status).toBe(200);
      expect(body.data.hits.length).toBe(pageSize);
      const originalTransaction = body.data.hits.find(
        (transaction) =>
          transaction.externalId === originalExternal.transaction_id
      );
      expect(originalTransaction).toBeDefined();
      if (originalTransaction) {
        expectTransactionToBeExternal(originalTransaction, originalExternal);
      }
      const createdTransaction = body.data.hits.find(
        (transaction) =>
          transaction.externalId === createdExternal.transaction_id
      );
      expect(createdTransaction).toBeDefined();
      if (createdTransaction) {
        expectTransactionToBeExternal(createdTransaction, createdExternal);
      }
    });
    it('returns 200 and updated transactions after sync', async () => {
      // Arrange

      // Create original item, account, and transaction
      const mockItem = buildItem();
      const mockAccount = buildAccount({
        item_id: mockItem.item_id
      });
      const originalExternal = buildTransaction({
        account_id: mockAccount.account_id
      });
      let { sut } = buildSut({
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
      const { authToken } = await createInstitution(sut);

      // Sync institutions
      const updatedExternal = {
        ...originalExternal,
        amount: 7,
        currency: 'EUR',
        date: new Date().toISOString(),
        name: 'Busch Light',
        merchantName: 'Hyvee Wine & Spirits',
        pending: false,
        logoUrl: 'rickroll.gif'
      };
      sut = buildSut({
        itemPublicTokenExchangeResponse: buildItemPublicTokenExchangeResponse({
          item_id: mockItem.item_id
        }),
        accountsBalanceGetResponse: buildAccountsBalanceGetResponse({
          accounts: [mockAccount]
        }),
        transactionSyncResponse: buildTransactionsSyncResponse({
          modified: [updatedExternal]
        })
      }).sut;
      await supertest(sut)
        .put('/institution/sync')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Build request
      const pageSize = 1;
      const request: FindTransactionsRequest = {
        page: 1,
        pageSize: pageSize
      };

      // Act
      const response = await supertest(sut)
        .get(`/transaction?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });
      const body: ApiSuccessResponse<Paginated<Transaction>> = response.body;

      // Asserts
      expect(response.status).toBe(200);
      expect(body.data.hits.length).toBe(pageSize);
      const updatedTransaction = body.data.hits.find(
        (transaction) =>
          transaction.externalId === updatedExternal.transaction_id
      );
      expect(updatedTransaction).toBeDefined();
      if (updatedTransaction) {
        expectTransactionToBeExternal(updatedTransaction, updatedExternal);
      }
    });
    it('returns 200 and no removed transactions after sync', async () => {
      // Arrange

      // Create original item, account, and transaction
      const mockItem = buildItem();
      const mockAccount = buildAccount({
        item_id: mockItem.item_id
      });
      const originalExternal = buildTransaction({
        account_id: mockAccount.account_id
      });
      let { sut } = buildSut({
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
      const { authToken } = await createInstitution(sut);

      // Sync institutions
      sut = buildSut({
        itemPublicTokenExchangeResponse: buildItemPublicTokenExchangeResponse({
          item_id: mockItem.item_id
        }),
        accountsBalanceGetResponse: buildAccountsBalanceGetResponse({
          accounts: [mockAccount]
        }),
        transactionSyncResponse: buildTransactionsSyncResponse({
          removed: [{ transaction_id: originalExternal.transaction_id }]
        })
      }).sut;
      await supertest(sut)
        .put('/institution/sync')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Build request
      const pageSize = 1;
      const request: FindTransactionsRequest = {
        page: 1,
        pageSize: pageSize
      };

      // Act
      const response = await supertest(sut)
        .get(`/transaction?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });
      const body: ApiSuccessResponse<Paginated<Transaction>> = response.body;

      // Asserts
      expect(response.status).toBe(200);
      expect(body.data.hits.length).toBe(0);
    });
  });
});
