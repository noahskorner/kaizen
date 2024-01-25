import { ApiSuccessResponse } from '@kaizen/core';
import supertest from 'supertest';
import { createAndLoginUser } from './create-and-login-user';
import {
  CreateVirtualAccountRequest,
  VirtualAccount,
  VirtualAccountFrequency
} from '@kaizen/finance';
import { appFixture } from '../app.fixture';

export const createVirtualAccount = async () => {
  const loginUser = await createAndLoginUser();

  const request: CreateVirtualAccountRequest = {
    name: 'Test Virtual Account',
    balance: 25,
    amount: 25,
    frequency: VirtualAccountFrequency.Weekly
  };
  const response = await supertest(appFixture)
    .post('/virtual-account')
    .send(request)
    .auth(loginUser.authToken.accessToken, { type: 'bearer' });
  const body: ApiSuccessResponse<VirtualAccount> = response.body;

  return { ...loginUser, virtualAccount: body.data };
};
