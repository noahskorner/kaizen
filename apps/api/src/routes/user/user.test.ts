import { ApiSuccessResponse, ErrorCode } from '@kaizen/core';
import supertest from 'supertest';
import { v4 as uuid } from 'uuid';
import { CreateUserCommand, User, LinkToken } from '@kaizen/user';
import { ServiceCollectionBuilder } from '../../service-collection.builder';
import { AppBuilder } from '../../app-builder';
import {
  defaultTestBed,
  expectError,
  createUniqueEmail,
  validPassword,
  MockPlaidApiBuilder,
  mockLinkTokenCreateResponse,
  createAndLoginUser
} from '../../../test';
import { CreateUserSuccessEvent, ServiceEventType } from '@kaizen/core-server';
// import '../../../src/index';
// import { CreateUserSuccessEvent, ServiceEventType } from '@kaizen/core-server';

describe('/user', () => {
  describe('create should', () => {
    it('returns 400 when request is null', async () => {
      // Act
      const response = await supertest(defaultTestBed).post('/user').send();

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorCode.CREATE_USER_INVALID_EMAIL);
    });
    it('returns 400 when request is empty', async () => {
      // Arrange
      const request = {};

      // Act
      const response = await supertest(defaultTestBed)
        .post('/user')
        .send(request);

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorCode.CREATE_USER_INVALID_EMAIL);
    });
    it('returns 400 when email is not valid', async () => {
      // Arrange
      const request = {
        email: 'invalid-email'
      };

      // Act
      const response = await supertest(defaultTestBed)
        .post('/user')
        .send(request);

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorCode.CREATE_USER_INVALID_EMAIL);
    });
    it('returns 400 when password not provided', async () => {
      // Arrange
      const request = {
        email: createUniqueEmail()
      };

      // Act
      const response = await supertest(defaultTestBed)
        .post('/user')
        .send(request);

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorCode.CREATE_USER_INVALID_PASSWORD);
    });
    it('returns 400 when password not long enough', async () => {
      // Arrange
      const request: CreateUserCommand = {
        email: createUniqueEmail(),
        password: '1234567'
      };

      // Act
      const response = await supertest(defaultTestBed)
        .post('/user')
        .send(request);

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorCode.CREATE_USER_PASSWORD_TOO_SHORT);
    });
    it('returns 400 when password has no numbers', async () => {
      // Arrange
      const request: CreateUserCommand = {
        email: createUniqueEmail(),
        password: 'abcdefghi'
      };

      // Act
      const response = await supertest(defaultTestBed)
        .post('/user')
        .send(request);

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorCode.CREATE_USER_PASSWORD_NO_NUMBER);
    });
    it('returns 400 when password has no symbols', async () => {
      // Arrange
      const request: CreateUserCommand = {
        email: createUniqueEmail(),
        password: '1234567a'
      };

      // Act
      const response = await supertest(defaultTestBed)
        .post('/user')
        .send(request);

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorCode.CREATE_USER_PASSWORD_NO_SYMBOL);
    });
    it('returns 400 when email already exists', async () => {
      // Arrange
      const request: CreateUserCommand = {
        email: createUniqueEmail(),
        password: validPassword
      };
      await supertest(defaultTestBed).post('/user').send(request);

      // Act
      const response = await supertest(defaultTestBed)
        .post('/user')
        .send(request);

      // Assert
      expect(response.statusCode).toBe(400);
      expectError(response, ErrorCode.CREATE_USER_EMAIL_ALREADY_EXISTS);
    });
    it('returns 201 and user with normalized email', async () => {
      // Arrange
      const request: CreateUserCommand = {
        email: `${uuid()}-UPPERcase@test.com`,
        password: validPassword
      };

      // Act
      const response = await supertest(defaultTestBed)
        .post('/user')
        .send(request);
      const body: ApiSuccessResponse<User> = response.body;

      // Assert
      expect(response.statusCode).toBe(201);
      expect(body.data.email).toBe(request.email.toLowerCase());
    });
    it('emits create user success event', async () => {
      // Arrange
      jest.spyOn(defaultTestBed.serviceCollection.serviceEventBus, 'publish');
      const request: CreateUserCommand = {
        email: `${uuid()}-UPPERcase@test.com`,
        password: validPassword
      };

      // Act
      const response = await supertest(defaultTestBed)
        .post('/user')
        .send(request);
      const body: ApiSuccessResponse<User> = response.body;
      const event: CreateUserSuccessEvent = {
        type: ServiceEventType.CREATE_USER_SUCCESS,
        payload: {
          userId: body.data.id
        }
      };

      // Assert
      expect(
        defaultTestBed.serviceCollection.serviceEventBus.publish
      ).toHaveBeenCalledWith(event);
    });
  });
  describe('createLinkToken should', () => {
    const mockPlaidApi = new MockPlaidApiBuilder()
      .withLinkTokenCreate(mockLinkTokenCreateResponse)
      .build();

    const mockServiceCollection = new ServiceCollectionBuilder()
      .withPlaidApi(mockPlaidApi)
      .build();

    const testBed = new AppBuilder()
      .withServiceCollection(mockServiceCollection)
      .build();

    it('return 401 when user is not authenticated', async () => {
      // Act
      const response = await supertest(testBed).post('/user/link-token').send();

      // Assert
      expect(response.statusCode).toBe(401);
    });
    it('returns 201 and link token', async () => {
      // Arrange
      const { authToken } = await createAndLoginUser(testBed);

      // Act
      const response = await supertest(testBed)
        .post('/user/link-token')
        .auth(authToken.accessToken, { type: 'bearer' });
      const body = response.body as ApiSuccessResponse<LinkToken>;

      // Assert
      expect(response.statusCode).toBe(201);
      expect(body.data.token).toBe(mockLinkTokenCreateResponse.link_token);
    });
  });
});
