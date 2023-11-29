import supertest from 'supertest';
import { app } from '../app';
import { createUniqueEmail } from './create-unique-email';
import { validPassword } from './valid-password';
import { AuthToken } from '@kaizen/auth';
import { CreateUserCommand } from '@kaizen/user-server';
import { LoginCommand } from '@kaizen/auth-server';
import { User } from '@kaizen/user';

export const createAndLoginUser = async () => {
  const email = createUniqueEmail();
  const userResponse = await supertest(app)
    .post('/user')
    .send({ email, password: validPassword } as CreateUserCommand);
  const user: User = userResponse.body;

  const authResponse = await supertest(app)
    .post('/auth')
    .send({ email: email, password: validPassword } as LoginCommand);
  const authToken: AuthToken = authResponse.body;

  return { authToken: authToken, user: user };
};
