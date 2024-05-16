import { Router } from 'express';
import { IServiceCollection } from '../service-collection.interface';
import { ExpressAdapter } from './express.adapter';

export const buildRouter = (serviceCollection: IServiceCollection) => {
  const router = Router();

  // /
  router.get(
    '/',
    ExpressAdapter.toRequestHandler(serviceCollection.homeController.find)
  );

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
      serviceCollection.createLinkTokenController.create
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
    ExpressAdapter.toRequestHandler(
      serviceCollection.createInstitutionController.create
    )
  );
  router.get(
    '/institution',
    ExpressAdapter.toRequestHandler(
      serviceCollection.findInstitutionsController.find
    )
  );
  router.put(
    '/institution/sync',
    ExpressAdapter.toRequestHandler(
      serviceCollection.syncInstitutionsController.sync
    )
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
    ExpressAdapter.toRequestHandler(
      serviceCollection.findTransactionsController.find
    )
  );
  router.put(
    '/transaction/:transactionId/category/:categoryId',
    ExpressAdapter.toRequestHandler(
      serviceCollection.updateCategoryController.update
    )
  );

  // /transaction/category
  router.get('/transaction/category', async (req, res) => {
    const handler = ExpressAdapter.toRequestHandler(
      serviceCollection.findCategoriesController.find
    );

    const response = await handler(req, res);
    return response;
  });

  // /wallet
  router.get(
    '/wallet/user/:userId',
    ExpressAdapter.toRequestHandler(serviceCollection.getWalletController.get)
  );

  return router;
};
