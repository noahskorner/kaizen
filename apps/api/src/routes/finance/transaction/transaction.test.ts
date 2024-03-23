import supertest from 'supertest';
import {
  ApiSuccessResponse,
  DEFAULT_PAGE_SIZE,
  ErrorCode,
  Paginated,
  range,
  toSearchParams
} from '@kaizen/core';
import {
  Category,
  FindTransactionsRequest,
  Location,
  Transaction
} from '@kaizen/finance';
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
import { buildTestBed } from '../../../../test/build-test-bed';
import {
  Transaction as PlaidTransaction,
  Location as PlaidLocation,
  PersonalFinanceCategory as PlaidCategory
} from 'plaid';

const expectLocationToBeExternal = (
  location: Location,
  external: PlaidLocation
) => {
  expect(location.id).toBeDefined();
  expect(location.address).toBe(external.address);
  expect(location.city).toBe(external.city);
  expect(location.region).toBe(external.region);
  expect(location.postalCode).toBe(external.postal_code);
  expect(location.country).toBe(external.country);
  expect(location.lat).toBe(external.lat);
  expect(location.lon).toBe(external.lon);
  expect(location.storeNumber).toBe(external.store_number);
};

const expectCategoryToBeExternal = (
  category: Category | null,
  external: PlaidCategory | null
) => {
  if (category == null || external == null) {
    expect(category).toBeNull();
    expect(external).toBeNull();
  }

  if (category != null && external != null) {
    expect(category.id).toBeDefined();
    expect(category.primary).toBe(external.primary);
    expect(category.detailed).toBe(external.detailed);
    expect(category.confidenceLevel).toBe(external.confidence_level);
  }
};

const expectTransactionToBeExternal = (
  transaction: Transaction,
  external: PlaidTransaction
) => {
  expect(transaction.id).toBeDefined();
  expect(transaction.userId).toBeDefined();
  expect(transaction.institutionId).toBeDefined();
  expect(transaction.accountId).toBeDefined();
  expect(transaction.externalId).toBe(external.transaction_id);
  expect(transaction.externalAccountId).toBe(external.account_id);
  expectLocationToBeExternal(transaction.location, external.location);
  expectCategoryToBeExternal(
    transaction.category,
    external.personal_finance_category ?? null
  );
  expect(transaction.amount).toBe(external.amount);
  expect(transaction.isoCurrencyCode).toBe(external.iso_currency_code);
  expect(transaction.unofficialCurrencyCode).toBe(
    external.unofficial_currency_code
  );
  expect(transaction.checkNumber).toBe(external.check_number);
  expect(transaction.date).toBe(new Date(external.date).toISOString());
  expect(transaction.name).toBe(external.name);
  expect(transaction.merchantName).toBe(external.merchant_name);
  expect(transaction.originalDescription).toBe(external.original_description);
  expect(transaction.pending).toBe(external.pending);
  expect(transaction.pendingTransactionId).toBe(
    external.pending_transaction_id
  );
  expect(transaction.accountOwner).toBe(external.account_owner);
  expect(transaction.logoUrl).toBe(external.logo_url);
  expect(transaction.website).toBe(external.website);
  if (external.authorized_date == null) {
    expect(transaction.authorizedDate).toBeNull();
  } else {
    expect(transaction.authorizedDate).toBe(
      new Date(external.authorized_date).toISOString()
    );
  }
  expect(transaction.authorizedDatetime).toBe(external.authorized_datetime);
  expect(transaction.datetime).toBe(external.datetime);
  expect(transaction.paymentChannel).toBe(external.payment_channel);
  expect(transaction.code).toBe(external.transaction_code);
  expect(transaction.categoryIconUrl).toBe(
    external.personal_finance_category_icon_url
  );
  expect(transaction.merchantEntityId).toBe(external.merchant_entity_id);
};

describe('/transaction', () => {
  describe('find should', () => {
    it('returns 400 when page not provided', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .get('/transaction')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(400);
      expectError(response, ErrorCode.FIND_TRANSACTIONS_INVALID_PAGE);
    });
    it('returns 400 when page not valid', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);
      const request: FindTransactionsRequest = {
        page: 0
      };

      // Act
      const response = await supertest(testBed)
        .get(`/transaction?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(400);
      expectError(response, ErrorCode.FIND_TRANSACTIONS_INVALID_PAGE);
    });
    it('returns 400 when pageSize not valid', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);
      const request: Omit<FindTransactionsRequest, 'pageSize'> & {
        pageSize: null;
      } = {
        page: 1,
        pageSize: null
      };

      // Act
      const response = await supertest(testBed)
        .get(`/transaction?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(400);
      expectError(response, ErrorCode.FIND_TRANSACTIONS_INVALID_PAGE_SIZE);
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
      const { testBed } = buildTestBed({
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
      const { authToken } = await createInstitution(testBed);
      const request: FindTransactionsRequest = {
        page: 1
      };

      // Act
      const response = await supertest(testBed)
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
      const { testBed } = buildTestBed({
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
      const { authToken } = await createInstitution(testBed);
      const pageSize = 7;
      const request: FindTransactionsRequest = {
        page: 1,
        pageSize: pageSize
      };

      // Act
      const response = await supertest(testBed)
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
    it('returns 200 and transactions ordered by date', async () => {
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
      const { testBed } = buildTestBed({
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
      const { authToken } = await createInstitution(testBed);
      const request: FindTransactionsRequest = {
        page: 1,
        pageSize: 15
      };

      // Act
      const response = await supertest(testBed)
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
      let { testBed } = buildTestBed({
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

      // Sync institutions
      const createdExternal = buildTransaction({
        account_id: mockAccount.account_id
      });
      testBed = buildTestBed({
        itemPublicTokenExchangeResponse: buildItemPublicTokenExchangeResponse({
          item_id: mockItem.item_id
        }),
        accountsBalanceGetResponse: buildAccountsBalanceGetResponse({
          accounts: [mockAccount]
        }),
        transactionSyncResponse: buildTransactionsSyncResponse({
          added: [createdExternal]
        })
      }).testBed;
      await supertest(testBed)
        .put('/institution/sync')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Build request
      const pageSize = 2;
      const request: FindTransactionsRequest = {
        page: 1,
        pageSize: pageSize
      };

      // Act
      const response = await supertest(testBed)
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
      let { testBed } = buildTestBed({
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

      // Sync institutions
      const updatedExternal = buildTransaction({
        account_id: originalExternal.account_id,
        transaction_id: originalExternal.transaction_id
      });
      testBed = buildTestBed({
        itemPublicTokenExchangeResponse: buildItemPublicTokenExchangeResponse({
          item_id: mockItem.item_id
        }),
        accountsBalanceGetResponse: buildAccountsBalanceGetResponse({
          accounts: [mockAccount]
        }),
        transactionSyncResponse: buildTransactionsSyncResponse({
          modified: [updatedExternal]
        })
      }).testBed;
      await supertest(testBed)
        .put('/institution/sync')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Build request
      const pageSize = 1;
      const request: FindTransactionsRequest = {
        page: 1,
        pageSize: pageSize
      };

      // Act
      const response = await supertest(testBed)
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
      let { testBed } = buildTestBed({
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

      // Sync institutions
      testBed = buildTestBed({
        itemPublicTokenExchangeResponse: buildItemPublicTokenExchangeResponse({
          item_id: mockItem.item_id
        }),
        accountsBalanceGetResponse: buildAccountsBalanceGetResponse({
          accounts: [mockAccount]
        }),
        transactionSyncResponse: buildTransactionsSyncResponse({
          removed: [{ transaction_id: originalExternal.transaction_id }]
        })
      }).testBed;
      await supertest(testBed)
        .put('/institution/sync')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Build request
      const pageSize = 1;
      const request: FindTransactionsRequest = {
        page: 1,
        pageSize: pageSize
      };

      // Act
      const response = await supertest(testBed)
        .get(`/transaction?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });
      const body: ApiSuccessResponse<Paginated<Transaction>> = response.body;

      // Asserts
      expect(response.status).toBe(200);
      expect(body.data.hits.length).toBe(0);
    });
    it('returns 400 when start date not valid', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createInstitution(testBed);
      const request: FindTransactionsRequest = {
        page: 1,
        startDate: 'invalid'
      };

      // Act
      const response = await supertest(testBed)
        .get(`/transaction?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(400);
      expectError(response, ErrorCode.FIND_TRANSACTIONS_INVALID_START_DATE);
    });
    it('returns 400 when end date not valid', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createInstitution(testBed);
      const request: FindTransactionsRequest = {
        page: 1,
        endDate: 'invalid'
      };

      // Act
      const response = await supertest(testBed)
        .get(`/transaction?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(400);
      expectError(response, ErrorCode.FIND_TRANSACTIONS_INVALID_END_DATE);
    });
    it('returns 400 when end date after start date', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createInstitution(testBed);

      // Build request
      const pageSize = 1;
      const request: FindTransactionsRequest = {
        page: 1,
        pageSize: pageSize,
        startDate: new Date(1998, 7, 30, 0, 0, 0, 1).toISOString(),
        endDate: new Date(1998, 7, 30, 0, 0, 0, 0).toISOString()
      };

      // Act
      const response = await supertest(testBed)
        .get(`/transaction?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(400);
      expectError(response, ErrorCode.FIND_TRANSACTIONS_INVALID_TIMEFRAME);
    });
    it('returns 200 and transactions between start and end date', async () => {
      // Arrange
      const mockItem = buildItem();
      const mockAccount = buildAccount({
        item_id: mockItem.item_id
      });
      const excludedStartTransaction = buildTransaction({
        account_id: mockAccount.account_id,
        authorized_date: new Date(1998, 7, 29).toISOString()
      });
      const expectedTransaction = buildTransaction({
        account_id: mockAccount.account_id,
        date: new Date(1998, 7, 30).toISOString()
      });
      const excludedEndTransaction = buildTransaction({
        account_id: mockAccount.account_id,
        date: new Date(1998, 7, 31).toISOString()
      });
      const { testBed } = buildTestBed({
        itemPublicTokenExchangeResponse: buildItemPublicTokenExchangeResponse({
          item_id: mockItem.item_id
        }),
        accountsBalanceGetResponse: buildAccountsBalanceGetResponse({
          accounts: [mockAccount]
        }),
        transactionSyncResponse: buildTransactionsSyncResponse({
          added: [
            excludedStartTransaction,
            expectedTransaction,
            excludedEndTransaction
          ]
        })
      });
      const { authToken } = await createInstitution(testBed);

      // Build request
      const pageSize = 1;
      const request: FindTransactionsRequest = {
        page: 1,
        pageSize: pageSize,
        startDate: new Date(1998, 7, 30, 0, 0, 0, 0).toISOString(),
        endDate: new Date(1998, 7, 30, 23, 59, 59, 999).toISOString()
      };

      // Act
      const response = await supertest(testBed)
        .get(`/transaction?${toSearchParams(request)}`)
        .auth(authToken.accessToken, { type: 'bearer' });
      const body: ApiSuccessResponse<Paginated<Transaction>> = response.body;

      // Asserts
      expect(response.status).toBe(200);
      expect(body.data.total).toBe(1);
      expect(body.data.hits.length).toBe(1);
      expectTransactionToBeExternal(body.data.hits[0], expectedTransaction);
    });
  });
});
