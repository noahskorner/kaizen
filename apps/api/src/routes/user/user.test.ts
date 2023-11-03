import { ApiError, ErrorKey } from '@kaizen/services';
import supertest from 'supertest';
import { app } from '../../app';

describe('/user should', () => {
  it('returns 400 when request is empty', async () => {
    // Arrange
    const request = {};

    // Act
    const response = await supertest(app).post('/user').send(request);

    // Assert
    expect(response.statusCode).toBe(400);
    expectError(response, ErrorKey.CREATE_USER_INVALID_EMAIL);
  });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const expectError = (response: any, error: ErrorKey) => {
  const errors: ApiError[] = response._body;
  expect(errors.map((x) => x.key)).toContain(error);
};
