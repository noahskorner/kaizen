import supertest from 'supertest';
import { app } from '../../app';

describe('/auth should', () => {
  it('returns 400 if request is empty', async () => {
    // Act
    const response = await supertest(app).post('/user').send();

    // Assert
    expect(response.statusCode).toBe(400);
  });
});
