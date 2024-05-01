import supertest from 'supertest';
import { validPassword } from './valid-password';
import { AuthToken, LoginCommand } from '@kaizen/auth';
import { ApiSuccessResponse } from '@kaizen/core';
import { Application } from 'express';
import { createUser } from './create-user';

export const createAndLoginUser = async (testBed: Application) => {
  const user = await createUser(testBed);

  const authResponse = await supertest(testBed)
    .post('/auth')
    .send({ email: user.email, password: validPassword } as LoginCommand);
  const authResponseBody: ApiSuccessResponse<AuthToken> = authResponse.body;

  return {
    authHeaders: authResponse.headers,
    authToken: authResponseBody.data,
    user: user
  };
};
