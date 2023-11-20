import supertest from 'supertest';
import { app } from '../app';
import { createUniqueEmail } from './create-unique-email';
import { validPassword } from './valid-password';
import { AuthToken } from '@kaizen/auth';
import { CreateUserCommand } from '@kaizen/user-server';
import { LoginCommand } from '@kaizen/auth-server';

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
