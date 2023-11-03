import { ApiError, CreateUserCommand, ErrorKey } from '@kaizen/services';
import supertest from 'supertest';
import { app } from '../../app';

describe('/user should', () => {
  it('returns 400 when request is null', async () => {
    // Act
    const response = await supertest(app).post('/user').send();

    // Assert
    expect(response.statusCode).toBe(400);
    expectError(response, ErrorKey.CREATE_USER_INVALID_EMAIL);
  });
  it('returns 400 when request is empty', async () => {
    // Arrange
    const request = {};

    // Act
    const response = await supertest(app).post('/user').send(request);

    // Assert
    expect(response.statusCode).toBe(400);
    expectError(response, ErrorKey.CREATE_USER_INVALID_EMAIL);
  });
  it('returns 400 when email is not valid', async () => {
    // Arrange
    const request = {
      email: 'invalid-email'
    };

    // Act
    const response = await supertest(app).post('/user').send(request);

    // Assert
    expect(response.statusCode).toBe(400);
    expectError(response, ErrorKey.CREATE_USER_INVALID_EMAIL);
  });
  it('returns 400 when password not provided', async () => {
    // Arrange
    const request = {
      email: 'kaizen@gmail.com'
    };

    // Act
    const response = await supertest(app).post('/user').send(request);

    // Assert
    expect(response.statusCode).toBe(400);
    expectError(response, ErrorKey.CREATE_USER_INVALID_PASSWORD);
  });
  it('returns 400 when password not long enough', async () => {
    // Arrange
    const request: CreateUserCommand = {
      email: 'kaizen@gmail.com',
      password: '1234567'
    };

    // Act
    const response = await supertest(app).post('/user').send(request);

    // Assert
    expect(response.statusCode).toBe(400);
    expectError(response, ErrorKey.CREATE_USER_PASSWORD_TOO_SHORT);
  });
  it('returns 400 when password has no numbers', async () => {
    // Arrange
    const request: CreateUserCommand = {
      email: 'kaizen@gmail.com',
      password: 'abcdefghi'
    };

    // Act
    const response = await supertest(app).post('/user').send(request);

    // Assert
    expect(response.statusCode).toBe(400);
    expectError(response, ErrorKey.CREATE_USER_PASSWORD_NO_NUMBER);
  });
  it('returns 400 when password has no symbols', async () => {
    // Arrange
    const request: CreateUserCommand = {
      email: 'kaizen@gmail.com',
      password: '1234567a'
    };

    // Act
    const response = await supertest(app).post('/user').send(request);

    // Assert
    expect(response.statusCode).toBe(400);
    expectError(response, ErrorKey.CREATE_USER_PASSWORD_NO_SYMBOL);
  });
  it('returns 400 when email already exists', async () => {
    // Arrange
    const request: CreateUserCommand = {
      email: 'kaizen@gmail.com',
      password: '1234567a$'
    };
    await supertest(app).post('/user').send(request);

    // Act
    const response = await supertest(app).post('/user').send(request);

    // Assert
    expect(response.statusCode).toBe(400);
    expectError(response, ErrorKey.CREATE_USER_EMAIL_ALREADY_EXISTS);
  });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const expectError = (response: any, error: ErrorKey) => {
  const errors: ApiError[] = response._body;
  expect(errors.map((x) => x.key)).toContain(error);
};
