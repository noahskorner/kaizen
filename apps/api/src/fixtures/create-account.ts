import { Account, CreateAccountRequest } from '@kaizen/account';
import { createAndLoginUser } from './create-and-login-user';
import supertest from 'supertest';
import { app } from '../app';

export const createAccount = async () => {
  const loginUser = await createAndLoginUser();
  const request: CreateAccountRequest = {
    publicToken: 'TEST_PLAID_PUBLIC_TOKEN'
  };

  const response = await supertest(app)
    .post('/account')
    .send(request)
    .auth(loginUser.authToken.accessToken, { type: 'bearer' });

  const account: Account = response.body;
  return { ...loginUser, account: account };
};
