import supertest from 'supertest';
import { createAndLoginUser, expectError } from '../../../../test';
import { buildTestBed } from '../../../../test/build-test-bed';
import { ApiSuccessResponse, ErrorCode } from '@kaizen/core';
import { Category, CreateCategoryRequest } from '@kaizen/finance';
import { v4 as uuid } from 'uuid';

describe('/category', () => {
  describe('create should', () => {
    it('returns 400 when no name is provided', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .post('/category')
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorCode.CREATE_CATEGORY_MUST_PROVIDE_NAME);
    });
    it('returns 400 when category with name already exists for user', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);
      const request: CreateCategoryRequest = {
        name: uuid(),
        parentId: null
      };
      await supertest(testBed)
        .post('/category')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Act
      const response = await supertest(testBed)
        .post('/category')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorCode.CREATE_CATEGORY_ALREADY_EXISTS);
    });
    it('returns 400 when parent category does not exist', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken } = await createAndLoginUser(testBed);
      const request: CreateCategoryRequest = {
        name: uuid(),
        parentId: uuid()
      };

      // Act
      const response = await supertest(testBed)
        .post('/category')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorCode.CREATE_CATEGORY_PARENT_DOES_NOT_EXIST);
    });
    it('returns 201 and created category', async () => {
      // Arrange
      const { testBed } = buildTestBed();
      const { authToken, user } = await createAndLoginUser(testBed);
      const request: CreateCategoryRequest = {
        name: uuid(),
        parentId: null
      };

      // Act
      const response = await supertest(testBed)
        .post('/category')
        .send(request)
        .auth(authToken.accessToken, { type: 'bearer' });
      const body = response.body as ApiSuccessResponse<Category>;

      // Assert
      expect(response.statusCode).toBe(201);
      expect(body.type).toBe('SUCCESS');
      if (body.type === 'SUCCESS') {
        expect(body.data.id).toBeDefined();
        expect(body.data.userId).toBe(user.id);
        expect(body.data.parentId).toBe(request.parentId);
        expect(body.data.name).toBe(request.name);
        expect(body.data.subcategories).toEqual([]);
      }
    });
  });
});
