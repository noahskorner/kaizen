import { CreateWalletCommand } from '@kaizen/wallet';
import { Application } from 'express';
import { createUser } from './create-user';

export const createWallet = async (testBed: Application) => {
  const user = await createUser(testBed);
  const response = await testBed.serviceCollection.createWalletService.create({
    userId: user.id
  } satisfies CreateWalletCommand);

  if (response.type === 'FAILURE') {
    throw new Error(JSON.stringify(response));
  }

  return { user, wallet: response.data };
};
