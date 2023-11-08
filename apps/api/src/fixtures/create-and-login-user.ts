import { CreateUserCommand, LoginCommand } from '@kaizen/services';
import supertest from 'supertest';
import { app } from '../app';
import { createUniqueEmail } from './create-unique-email';
import { validPassword } from './valid-password';
import { AuthToken } from '@kaizen/core';

export const createAndLoginUser = async () => {
  const email = createUniqueEmail();
  await supertest(app)
    .post('/user')
    .send({ email, password: validPassword } as CreateUserCommand);

  const response = await supertest(app)
    .post('/auth')
    .send({ email: email, password: validPassword } as LoginCommand);

  return response.body as AuthToken;
};
