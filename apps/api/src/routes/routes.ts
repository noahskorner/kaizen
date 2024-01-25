import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { IServiceCollection } from './service-collection.interface';

export const createRouter = (serviceCollection: IServiceCollection) => {
  const router = Router();

  // /
  router.get('/', serviceCollection.homeController.find);

  // /user
  router.post('/user', serviceCollection.userController.create);
  router.post(
    '/user/link-token',
    authenticate,
    serviceCollection.userController.createLinkToken
  );

  // /auth
  router.post('/auth', serviceCollection.authController.login);
  router.get('/auth', serviceCollection.authController.refreshToken);
  router.delete('/auth', authenticate, serviceCollection.authController.logout);

  // /institution
  router.post(
    '/institution',
    authenticate,
    serviceCollection.institutionController.create
  );
  router.get(
    '/institution',
    authenticate,
    serviceCollection.institutionController.find
  );

  // /transaction
  router.get(
    '/transaction',
    authenticate,
    serviceCollection.transactionController.find
  );

  // /virtual-account
  router.post(
    '/virtual-account',
    authenticate,
    serviceCollection.virtualAccountController.create
  );
  router.get(
    '/virtual-account',
    authenticate,
    serviceCollection.virtualAccountController.find
  );

  return router;
};
