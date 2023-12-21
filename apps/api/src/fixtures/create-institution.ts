import { Institution, CreateInstitutionRequest } from '@kaizen/finance';
import { createAndLoginUser } from './create-and-login-user';
import supertest from 'supertest';
import { app } from '../app';
import { ApiSuccessResponse } from '@kaizen/core';

export const createInstitution = async () => {
  const loginUser = await createAndLoginUser();
  const request: CreateInstitutionRequest = {
    publicToken: 'TEST_PLAID_PUBLIC_TOKEN'
  };

  const response = await supertest(app)
    .post('/finance/institution')
    .send(request)
    .auth(loginUser.authToken.accessToken, { type: 'bearer' });
  const body: ApiSuccessResponse<Institution> = response.body;

  return { ...loginUser, institution: body.data };
};
