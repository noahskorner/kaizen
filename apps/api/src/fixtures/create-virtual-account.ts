import { ApiSuccessResponse } from '@kaizen/core';
import supertest from 'supertest';
import { app } from '../app';
import { createAndLoginUser } from './create-and-login-user';
import {
  CreateVirtualAccountRequest,
  VirtualAccount,
  VirtualAccountFrequency
} from '@kaizen/finance';

export const createVirtualAccount = async () => {
  const loginUser = await createAndLoginUser();

  const request: CreateVirtualAccountRequest = {
    name: 'Test Virtual Account',
    balance: 25,
    amount: 25,
    frequency: VirtualAccountFrequency.Weekly
  };
  const response = await supertest(app)
    .post('/virtual-account')
    .send(request)
    .auth(loginUser.authToken.accessToken, { type: 'bearer' });
  const body: ApiSuccessResponse<VirtualAccount> = response.body;

  return { ...loginUser, virtualAccount: body.data };
};
