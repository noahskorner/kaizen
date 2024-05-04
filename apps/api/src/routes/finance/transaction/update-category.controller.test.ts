import supertest from 'supertest';
import { ApiResponse, ErrorCode, toSearchParams } from '@kaizen/core';
import { createAndLoginUser } from '../../../../test/create-and-login-user';
import {
  buildAccount,
  buildAccountsBalanceGetResponse,
  buildItem,
  buildItemPublicTokenExchangeResponse,
  buildTransaction,
  buildTransactionsSyncResponse,
  createInstitution,
  expectError
} from '../../../../test';
import { buildTestBed } from '../../../../test/build-test-bed';
import { v4 as uuid } from 'uuid';
import { Category, Transaction, UpdateCategoryRequest } from '@kaizen/finance';

const createTransaction = async () => {
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
    transactionId: transaction.id,
    categoryId: transaction.category.id
  };
};

describe('/transaction/:transactionId/category/:categoryId should', () => {
  describe('update should', () => {
    it('returns 404 when category not found', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .put(`/transaction/${uuid()}/category/${uuid()}`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(404);
      expectError(response, ErrorCode.UPDATE_CATEGORY_NOT_FOUND);
    });
    it('returns updated category when category is null', async () => {
      // Arrange
      const { testBed, authToken, transactionId, categoryId } =
        await createTransaction();
      const request: UpdateCategoryRequest = {
        userCategory: null
      };

      // Act
      const response = await supertest(testBed)
        .put(`/transaction/${transactionId}/category/${categoryId}`)
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });
      const body = response.body as ApiResponse<Category>;

      // Asserts
      expect(response.status).toBe(200);
      expect(body.type).toBe('SUCCESS');
      if (body.type === 'SUCCESS') {
        expect(body.data.userCategory).toBe(request.userCategory);
      }
    });
    it('returns updated category', async () => {
      // Arrange
      const { testBed, authToken, transactionId, categoryId } =
        await createTransaction();
      const request: UpdateCategoryRequest = {
        userCategory: uuid()
      };

      // Act
      const response = await supertest(testBed)
        .put(`/transaction/${transactionId}/category/${categoryId}`)
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });
      const body = response.body as ApiResponse<Category>;

      // Asserts
      expect(response.status).toBe(200);
      expect(body.type).toBe('SUCCESS');
      if (body.type === 'SUCCESS') {
        expect(body.data.userCategory).toBe(request.userCategory);
      }
    });
  });
});
