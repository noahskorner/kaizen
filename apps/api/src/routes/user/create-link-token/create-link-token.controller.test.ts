import { ApiSuccessResponse } from '@kaizen/core';
import supertest from 'supertest';
import { LinkToken } from '@kaizen/user';
import { ServiceCollectionBuilder } from '../../../service-collection.builder';
import { AppBuilder } from '../../../app-builder';
import {
  MockPlaidApiBuilder,
  mockLinkTokenCreateResponse,
  createAndLoginUser
} from '../../../../test';

describe('/user', () => {
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
