import supertest from 'supertest';
import { createUniqueEmail } from './create-unique-email';
import { validPassword } from './valid-password';
import { AuthToken, LoginCommand } from '@kaizen/auth';
import { CreateUserCommand, User } from '@kaizen/user';
import { ApiSuccessResponse } from '@kaizen/core';
import { defaultAppFixture as defaultAppFixture } from '../app.fixture';
import { Application } from 'express';

export const createAndLoginUser = async (
  appFixture: Application = defaultAppFixture
) => {
  const email = createUniqueEmail();
  const userResponse = await supertest(appFixture)
    .post('/user')
    .send({ email, password: validPassword } as CreateUserCommand);
  const userResponseBody: ApiSuccessResponse<User> = userResponse.body;

  const authResponse = await supertest(appFixture)
    .post('/auth')
    .send({ email: email, password: validPassword } as LoginCommand);
  const authResponseBody: ApiSuccessResponse<AuthToken> = authResponse.body;

  return { authToken: authResponseBody.data, user: userResponseBody.data };
};
