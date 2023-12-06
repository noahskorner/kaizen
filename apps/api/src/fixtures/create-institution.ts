import { Institution, CreateInstitutionRequest } from '@kaizen/institution';
import { createAndLoginUser } from './create-and-login-user';
import supertest from 'supertest';
import { app } from '../app';

export const createInstitution = async () => {
  const loginUser = await createAndLoginUser();
  const request: CreateInstitutionRequest = {
    publicToken: 'TEST_PLAID_PUBLIC_TOKEN'
  };

  const response = await supertest(app)
    .post('/institution')
    .send(request)
    .auth(loginUser.authToken.accessToken, { type: 'bearer' });

  const institution: Institution = response.body;
  return { ...loginUser, institution: institution };
};
