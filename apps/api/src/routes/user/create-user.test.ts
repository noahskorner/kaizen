import { ApiSuccessResponse, ErrorCode } from '@kaizen/core';
import supertest from 'supertest';
import { v4 as uuid } from 'uuid';
import { CreateUserCommand, User } from '@kaizen/user';
import {
  defaultTestBed,
  expectError,
  createUniqueEmail,
  validPassword,
  buildTestBed
} from '../../../test';
import { CreateUserSuccessEvent, ServiceEventType } from '@kaizen/core-server';

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
      const { testBed, serviceCollection } = buildTestBed();
      jest.spyOn(serviceCollection.serviceEventBus, 'publish');
      const request: CreateUserCommand = {
        email: `${uuid()}-UPPERcase@test.com`,
        password: validPassword
      };

      // Act
      const response = await supertest(testBed).post('/user').send(request);
      const body: ApiSuccessResponse<User> = response.body;
      const event: CreateUserSuccessEvent = {
        type: ServiceEventType.CREATE_USER_SUCCESS,
        payload: {
          userId: body.data.id
        }
      };

      // Assert
      expect(serviceCollection.serviceEventBus.publish).toHaveBeenCalledWith(
        event
      );
    });
  });
});
