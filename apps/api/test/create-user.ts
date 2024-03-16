import { ApiSuccessResponse } from '@kaizen/core';
import { createUniqueEmail } from './create-unique-email';
import { CreateUserCommand, User } from '@kaizen/user';
import supertest from 'supertest';
import { validPassword } from './valid-password';
import { Application } from 'express';

export const createUser = async (testBed: Application) => {
  const email = createUniqueEmail();
  const userResponse = await supertest(testBed)
    .post('/user')
    .send({ email, password: validPassword } as CreateUserCommand);
  const userResponseBody: ApiSuccessResponse<User> = userResponse.body;

  return userResponseBody.data;
};
