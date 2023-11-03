import request from 'supertest';
import { app } from '../src/app';

describe('Test the root path', () => {
  test('Root path test', async () => {
    // Act
    const response = await request(app).get('/');

    // Assert
    expect(response.statusCode).toBe(200);
  });
});
