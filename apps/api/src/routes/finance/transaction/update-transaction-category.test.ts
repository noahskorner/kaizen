import supertest from 'supertest';
import { ApiSuccessResponse, ErrorCode } from '@kaizen/core';
import { createAndLoginUser } from '../../../../test/create-and-login-user';
import { createTransaction, expectError } from '../../../../test';
import { buildTestBed } from '../../../../test/build-test-bed';
import { v4 as uuid } from 'uuid';
import {
  Category,
  CreateCategoryRequest,
  Transaction,
  UpdateTransactionCategoryRequest
} from '@kaizen/finance';

describe('/transaction/:transactionId/category should', () => {
  describe('update should', () => {
    it('returns 404 when transaction not found', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .put(`/transaction/${uuid()}/category`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(404);
      expectError(
        response,
        ErrorCode.UPDATE_TRANSACTION_CATEGORY_TRANSACTION_NOT_FOUND
      );
    });
    it('returns 404 when category is null', async () => {
      // Arrange
      const { authToken, testBed, transactionId } = await createTransaction();

      // Act
      const response = await supertest(testBed)
        .put(`/transaction/${transactionId}/category`)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(404);
      expectError(response, ErrorCode.UPDATE_TRANSACTION_CATEGORY_NOT_FOUND);
    });
    it('returns 404 when category does not exist', async () => {
      // Arrange
      const { authToken, testBed, transactionId } = await createTransaction();

      // Act
      const response = await supertest(testBed)
        .put(`/transaction/${transactionId}/category`)
        .send({
          categoryId: uuid()
        } satisfies UpdateTransactionCategoryRequest)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(404);
      expectError(response, ErrorCode.UPDATE_TRANSACTION_CATEGORY_NOT_FOUND);
    });
    it('returns updated transaction', async () => {
      // Arrange
      const { testBed, authToken, transactionId } = await createTransaction();
      const createCategoryResponse = await supertest(testBed)
        .post('/category')
        .send({ name: uuid() } satisfies CreateCategoryRequest)
        .auth(authToken.accessToken, { type: 'bearer' });
      const categoryResponse =
        createCategoryResponse.body as ApiSuccessResponse<Category>;
      const request: UpdateTransactionCategoryRequest = {
        categoryId: categoryResponse.data.id
      };

      // Act
      const response = await supertest(testBed)
        .put(`/transaction/${transactionId}/category`)
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });
      const body = response.body as ApiSuccessResponse<Transaction>;

      // Asserts
      expect(response.status).toBe(200);
      expect(body.type).toBe('SUCCESS');
      if (body.type === 'SUCCESS') {
        expect(body.data.categoryId).toBe(request.categoryId);
      }
    });
  });
});
