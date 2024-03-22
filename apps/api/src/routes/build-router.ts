import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { IServiceCollection } from '../service-collection.interface';

export const buildRouter = (serviceCollection: IServiceCollection) => {
  const router = Router();

  // /
  router.get('/', serviceCollection.homeController.find);

  // /user
  router.post('/user', serviceCollection.userController.create);
  router.post(
    '/user/link-token',
    authenticate(serviceCollection.environment),
    serviceCollection.userController.createLinkToken
  );

  // /auth
  router.post('/auth', serviceCollection.authController.login);
  router.get('/auth', serviceCollection.authController.refreshToken);
  router.delete(
    '/auth',
    authenticate(serviceCollection.environment),
    serviceCollection.authController.logout
  );

  // /institution
  router.post(
    '/institution',
    authenticate(serviceCollection.environment),
    serviceCollection.institutionController.create
  );
  router.get(
    '/institution',
    authenticate(serviceCollection.environment),
    serviceCollection.institutionController.find
  );
  router.put(
    '/institution/sync',
    authenticate(serviceCollection.environment),
    serviceCollection.institutionController.sync
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
