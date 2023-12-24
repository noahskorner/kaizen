import supertest from 'supertest';
import { app } from '../app';
import { createUniqueEmail } from './create-unique-email';
import { validPassword } from './valid-password';
import { AuthToken } from '@kaizen/auth';
import { LoginCommand } from '@kaizen/auth-server';
import { CreateUserCommand, User } from '@kaizen/user';
import { ApiSuccessResponse } from '@kaizen/core';

export const createAndLoginUser = async () => {
  const email = createUniqueEmail();
  const userResponse = await supertest(app)
    .post('/user')
    .send({ email, password: validPassword } as CreateUserCommand);
  const userResponseBody: ApiSuccessResponse<User> = userResponse.body;

  const authResponse = await supertest(app)
    .post('/auth')
    .send({ email: email, password: validPassword } as LoginCommand);
  const authResponseBody: ApiSuccessResponse<AuthToken> = authResponse.body;

  return { authToken: authResponseBody.data, user: userResponseBody.data };
};
