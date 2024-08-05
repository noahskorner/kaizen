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
        .send({
          transactionId: transactionId
        } satisfies Omit<UpdateTransactionCategoryRequest, 'categoryId'>)
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
          categoryId: uuid(),
          transactionId: transactionId
        } satisfies UpdateTransactionCategoryRequest)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Asserts
      expect(response.status).toBe(404);
      expectError(response, ErrorCode.UPDATE_TRANSACTION_CATEGORY_NOT_FOUND);
    });
    it('returns 200 and updated transaction', async () => {
      // Arrange
      const { testBed, authToken, transactionId } = await createTransaction();
      const category = (
        (
          await supertest(testBed)
            .post('/category')
            .send({
              name: uuid(),
              parentId: null
            } satisfies CreateCategoryRequest)
            .auth(authToken.accessToken, {
              type: 'bearer'
            })
        ).body as ApiSuccessResponse<Category>
      ).data;
      const request: UpdateTransactionCategoryRequest = {
        categoryId: category.id,
        transactionId: transactionId
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
        expect(body.data.category?.id).toBeDefined();
        expect(body.data.category?.name).toBe(category.name);
        expect(body.data.category?.parentId).toBe(category.parentId);
        expect(body.data.category?.subcategory).toBeNull();
      }
    });
    it('returns 200 and deletes old categories', async () => {
      // Arrange
      const { testBed, authToken, transactionId } = await createTransaction();
      const { rootCategory, unselectedCategory } =
        await createCategoryHierarchy(
          testBed,
          authToken.accessToken,
          transactionId
        );

      // Act
      const response = await supertest(testBed)
        .put(`/transaction/${transactionId}/category`)
        .send({
          categoryId: unselectedCategory.id,
          transactionId: transactionId
        } satisfies UpdateTransactionCategoryRequest)
        .auth(authToken.accessToken, { type: 'bearer' });
      const body = response.body as ApiSuccessResponse<Transaction>;

      // Asserts
      expect(response.status).toBe(200);
      expect(body.type).toBe('SUCCESS');
      if (body.type === 'SUCCESS') {
        expect(body.data.category?.id).toBeDefined();
        expect(body.data.category?.name).toBe(rootCategory.name);
        expect(body.data.category?.parentId).toBe(rootCategory.parentId);
        expect(body.data.category?.subcategory?.id).toBeDefined();
        expect(body.data.category?.subcategory?.name).toBe(
          unselectedCategory.name
        );
        expect(body.data.category?.subcategory?.parentId).toBe(
          unselectedCategory.parentId
        );
        expect(body.data.category?.subcategory?.subcategory).toBeNull();
      }
    });
  });
});

const createCategoryHierarchy = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  testBed: any,
  accessToken: string,
  transactionId: string
) => {
  // create the rootCategory and select it
  const rootCategory = (
    (
      await supertest(testBed)
        .post('/category')
        .send({
          name: 'rootCategory',
          parentId: null
        } satisfies CreateCategoryRequest)
        .auth(accessToken, { type: 'bearer' })
    ).body as ApiSuccessResponse<Category>
  ).data;
  await supertest(testBed)
    .put(`/transaction/${transactionId}/category`)
    .send({
      categoryId: rootCategory.id,
      transactionId: transactionId
    } satisfies UpdateTransactionCategoryRequest)
    .auth(accessToken, { type: 'bearer' });

  // create the level1Category1 and select it
  const level1Category1 = (
    (
      await supertest(testBed)
        .post('/category')
        .send({
          name: 'level1Category1',
          parentId: rootCategory.id
        } satisfies CreateCategoryRequest)
        .auth(accessToken, { type: 'bearer' })
    ).body as ApiSuccessResponse<Category>
  ).data;
  await supertest(testBed)
    .put(`/transaction/${transactionId}/category`)
    .send({
      categoryId: level1Category1.id,
      transactionId: transactionId
    } satisfies UpdateTransactionCategoryRequest)
    .auth(accessToken, { type: 'bearer' });

  // create the level2Category1 and select it
  const level2Category1 = (
    (
      await supertest(testBed)
        .post('/category')
        .send({
          name: 'level2Category1',
          parentId: level1Category1.id
        } satisfies CreateCategoryRequest)
        .auth(accessToken, { type: 'bearer' })
    ).body as ApiSuccessResponse<Category>
  ).data;

  await supertest(testBed)
    .put(`/transaction/${transactionId}/category`)
    .send({
      categoryId: level2Category1.id,
      transactionId: transactionId
    } satisfies UpdateTransactionCategoryRequest)
    .auth(accessToken, { type: 'bearer' });

  // create the level1Category2, but don't select it
  const level1Category2 = (
    (
      await supertest(testBed)
        .post('/category')
        .send({
          name: 'level1Category2',
          parentId: rootCategory.id
        } satisfies CreateCategoryRequest)
        .auth(accessToken, { type: 'bearer' })
    ).body as ApiSuccessResponse<Category>
  ).data;

  return {
    rootCategory,
    unselectedCategory: level1Category2
  };
};
