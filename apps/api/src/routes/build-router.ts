import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { IServiceCollection } from '../service-collection.interface';

export const buildRouter = (serviceCollection: IServiceCollection) => {
  const router = Router();

  // /
  router.get('/', serviceCollection.homeController.find);

  // /user
  router.post('/user', serviceCollection.createUserController.create);
  router.post(
    '/user/link-token',
    authenticate(serviceCollection.environment),
    serviceCollection.createLinkTokenController.createLinkToken
  );

  // /auth
  router.post('/auth', serviceCollection.loginController.login);
  router.get('/auth', serviceCollection.refreshTokenController.refreshToken);
  router.delete(
    '/auth',
    authenticate(serviceCollection.environment),
    serviceCollection.logoutController.logout
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
    authenticate(serviceCollection.environment),
    serviceCollection.findExpensesController.find
  );

  // /transaction
  router.get(
    '/transaction',
    authenticate(serviceCollection.environment),
    serviceCollection.transactionController.find
  );

  // /wallet
  router.get(
    '/wallet/user/:userId',
    authenticate(serviceCollection.environment),
    serviceCollection.getWalletController.get
  );

  return router;
};
