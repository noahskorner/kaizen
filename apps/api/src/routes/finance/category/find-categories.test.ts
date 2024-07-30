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
    it('return categories and their counts', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken, user } = await createAndLoginUser(testBed);
      const request: CreateCategoryRequest = {
        name: uuid()
      };
      await supertest(testBed)
        .post('/category')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });
      // Act
      const response = await supertest(testBed)
        .get('/category')
        .auth(authToken.accessToken, { type: 'bearer' });
      const body = response.body as ApiSuccessResponse<Category[]>;

      // Asserts
      expect(body.type).toBe('SUCCESS');
      if (body.type === 'SUCCESS') {
        expect(body.data.length).toBe(1);
        expect(body.data[0].id).toBeDefined();
        expect(body.data[0].userId).toBe(user.id);
        expect(body.data[0].name).toBe(request.name);
      }
    });
  });
});
