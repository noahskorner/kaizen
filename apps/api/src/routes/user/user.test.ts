import supertest from 'supertest';
import { app } from '../../app';

describe('/user should', () => {
  it('returns 500', async () => {
    // Arrange
    const request = {};

    // Act
    const response = await supertest(app).post('/user').send(request);

    // Assert
    expect(response.statusCode).toBe(500);
  });
});
