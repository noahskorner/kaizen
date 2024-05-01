import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { IServiceCollection } from '../service-collection.interface';
import { ExpressAdapter } from './express.adapter';

export const buildRouter = (serviceCollection: IServiceCollection) => {
  const router = Router();

  // /
  router.get('/', serviceCollection.homeController.find);

  // /user
  router.post(
    '/user',
    ExpressAdapter.toRequestHandler(
      serviceCollection.createUserController.create
    )
  );
  router.post(
    '/user/link-token',
    ExpressAdapter.toRequestHandler(
      serviceCollection.createLinkTokenController.createLinkToken
    )
  );

  // /auth
  router.post(
    '/auth',
    ExpressAdapter.toRequestHandler(serviceCollection.loginController.login)
  );
  router.get(
    '/auth',
    ExpressAdapter.toRequestHandler(
      serviceCollection.refreshTokenController.refreshToken
    )
  );
  router.delete(
    '/auth',
    ExpressAdapter.toRequestHandler(serviceCollection.logoutController.logout)
  );

  // /institution
  router.post(
    '/institution',
    authenticate(serviceCollection.environment),
    serviceCollection.createInstitutionController.create
  );
  router.get(
    '/institution',
    authenticate(serviceCollection.environment),
    serviceCollection.findInstitutionsController.find
  );
  router.put(
    '/institution/sync',
    authenticate(serviceCollection.environment),
    serviceCollection.syncInstitutionsController.sync
  );

  // /expense
  router.get(
    '/expense',
    ExpressAdapter.toRequestHandler(
      serviceCollection.findExpensesController.find
    )
  );

  // /transaction
  router.get(
    '/transaction',
    authenticate(serviceCollection.environment),
    serviceCollection.findTransactionsController.find
  );

  // /wallet
  router.get(
    '/wallet/user/:userId',
    ExpressAdapter.toRequestHandler(serviceCollection.getWalletController.get)
  );

  return router;
};
