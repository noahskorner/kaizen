import supertest from 'supertest';
import { buildTestBed } from '../../../../test/build-test-bed';
import { createAndLoginUser } from '../../../../test/create-and-login-user';
import { v4 as uuid } from 'uuid';
import { Category, CreateCategoryRequest } from '@kaizen/finance';
import { ApiSuccessResponse } from '@kaizen/core';

describe('/transaction/category', () => {
  describe('find should', () => {
    it('return empty when no categories exist', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .get('/category')
        .auth(authToken.accessToken, { type: 'bearer' });
      const body = response.body as ApiSuccessResponse<Category[]>;

      // Asserts
      expect(response.status).toBe(200);
      expect(body.type).toBe('SUCCESS');
      expect(body.data.length).toBe(0);
    });
    it('return 200 and only root category', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);
      const request: CreateCategoryRequest = {
        name: uuid(),
        parentId: null
      };
      const createCategoryResponse = await supertest(testBed)
        .post('/category')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });
      const createCategoryBody =
        createCategoryResponse.body as ApiSuccessResponse<Category>;
      const category = createCategoryBody.data;

      // Act
      const response = await supertest(testBed)
        .get('/category')
        .auth(authToken.accessToken, { type: 'bearer' });
      const body = response.body as ApiSuccessResponse<Category[]>;

      // Asserts
      expect(body.type).toBe('SUCCESS');
      if (body.type === 'SUCCESS') {
        expect(body.data.length).toBe(1);
        expect(body.data[0].id).toBe(category.id);
        expect(body.data[0].userId).toBe(category.userId);
        expect(body.data[0].name).toBe(category.name);
        expect(body.data[0].parentId).toBe(category.parentId);
        expect(body.data[0].subcategories.length).toBe(0);
      }
    });
    it('return 200 and nested categories', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);
      const { rootCategory, level1Category, level2Category1, level2Category2 } =
        await createCategoryHierarchy(testBed, authToken.accessToken);

      // Act
      const response = await supertest(testBed)
        .get('/category')
        .auth(authToken.accessToken, { type: 'bearer' });
      const body = response.body as ApiSuccessResponse<Category[]>;

      // Asserts
      expect(body.type).toBe('SUCCESS');
      if (body.type === 'SUCCESS') {
        expect(body.data.length).toBe(1);
        // rootCategory
        const actualRootCategory = body.data[0];
        expect(actualRootCategory.id).toBe(rootCategory.id);
        expect(actualRootCategory.userId).toBe(rootCategory.userId);
        expect(actualRootCategory.name).toBe(rootCategory.name);
        expect(actualRootCategory.parentId).toBe(rootCategory.parentId);
        expect(actualRootCategory.subcategories.length).toBe(1);
        // level1Category
        const actualLevel1Category = actualRootCategory.subcategories[0];
        expect(actualLevel1Category.id).toBe(level1Category.id);
        expect(actualLevel1Category.userId).toBe(level1Category.userId);
        expect(actualLevel1Category.name).toBe(level1Category.name);
        expect(actualLevel1Category.parentId).toBe(level1Category.parentId);
        expect(actualLevel1Category.subcategories.length).toBe(2);
        // level2Category1
        const actualLevel2Category1 = actualLevel1Category.subcategories[0];
        expect(actualLevel2Category1.id).toBe(level2Category1.id);
        expect(actualLevel2Category1.userId).toBe(level2Category1.userId);
        expect(actualLevel2Category1.name).toBe(level2Category1.name);
        expect(actualLevel2Category1.parentId).toBe(level2Category1.parentId);
        expect(actualLevel2Category1.subcategories.length).toBe(0);
        // level2Category2
        const actualLevel2Category2 = actualLevel1Category.subcategories[1];
        expect(actualLevel2Category2.id).toBe(level2Category2.id);
        expect(actualLevel2Category2.userId).toBe(level2Category2.userId);
        expect(actualLevel2Category2.name).toBe(level2Category2.name);
        expect(actualLevel2Category2.parentId).toBe(level2Category2.parentId);
        expect(actualLevel2Category2.subcategories.length).toBe(0);
      }
    });
  });
});

const createCategoryHierarchy = async (
  testBed: unknown,
  accessToken: string
) => {
  const rootCategory = (
    await supertest(testBed)
      .post('/category')
      .send({
        name: uuid(),
        parentId: null
      } satisfies CreateCategoryRequest)
      .auth(accessToken, { type: 'bearer' })
  ).body.data as Category;
  const level1Category = (
    await supertest(testBed)
      .post('/category')
      .send({
        name: uuid(),
        parentId: rootCategory.id
      } satisfies CreateCategoryRequest)
      .auth(accessToken, { type: 'bearer' })
  ).body.data as Category;
  const level2Category1 = (
    await supertest(testBed)
      .post('/category')
      .send({
        name: uuid(),
        parentId: level1Category.id
      } satisfies CreateCategoryRequest)
      .auth(accessToken, { type: 'bearer' })
  ).body.data as Category;
  const level2Category2 = (
    await supertest(testBed)
      .post('/category')
      .send({
        name: uuid(),
        parentId: level1Category.id
      } satisfies CreateCategoryRequest)
      .auth(accessToken, { type: 'bearer' })
  ).body.data as Category;

  return {
    rootCategory,
    level1Category,
    level2Category1,
    level2Category2
  };
};
