import { Institution, CreateInstitutionRequest } from '@kaizen/finance';
import { createAndLoginUser } from './create-and-login-user';
import supertest from 'supertest';
import { ApiSuccessResponse } from '@kaizen/core';
import { Application } from '../src/app-builder';

export const createInstitution = async (testBed: Application) => {
  const loginUser = await createAndLoginUser(testBed);

  const request: CreateInstitutionRequest = {
    publicToken: 'MOCK_EXTERNAL_PUBLIC_TOKEN'
  };
  const response = await supertest(testBed)
    .post('/institution')
    .send(request)
    .auth(loginUser.authToken.accessToken, { type: 'bearer' });
  const body: ApiSuccessResponse<Institution> = response.body;

  return { ...loginUser, institution: body.data };
};
