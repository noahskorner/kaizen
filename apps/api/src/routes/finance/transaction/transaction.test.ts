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
    });
    it('returns ordered by authorizedDate', async () => {
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
    });
  });
});
