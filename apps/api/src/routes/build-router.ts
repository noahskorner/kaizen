import { Router } from 'express';
import { IServiceCollection } from '../service-collection.interface';
import { ExpressAdapter } from './express.adapter';
import { AssistController } from './assist/assist.controller';

export const buildRouter = (serviceCollection: IServiceCollection) => {
  const router = Router();

  // /
  router.get(
    '/',
    ExpressAdapter.toRequestHandler(serviceCollection.homeController.find)
  );

  router.post('/assist/transcribe', (req, res) =>
    new AssistController(serviceCollection.transcriptionProvider).transcribe(
      req,
      res
    )
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
  router.post(
    '/user/email/token',
    ExpressAdapter.toRequestHandler(
      serviceCollection.updateEmailController.update
    )
  );
  router.put(
    '/user/email',
    ExpressAdapter.toRequestHandler(
      serviceCollection.verifyUpdateEmailController.verify
    )
  );
  router.post(
    '/user/password/token',
    ExpressAdapter.toRequestHandler(
      serviceCollection.updatePasswordController.update
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

  // /account
  router.get(
    '/account/history',
    ExpressAdapter.toRequestHandler(
      serviceCollection.findAccountHistoryController.find
    )
  );

  // /category
  router.post(
    '/category',
    ExpressAdapter.toRequestHandler(
      serviceCollection.createCategoryController.create
    )
  );
  router.get('/category', async (req, res) => {
    const handler = ExpressAdapter.toRequestHandler(
      serviceCollection.findCategoriesController.find
    );

    const response = await handler(req, res);
    return response;
  });

  // /transaction
  router.get(
    '/transaction',
    ExpressAdapter.toRequestHandler(
      serviceCollection.findTransactionsController.find
    )
  );
  router.put(
    '/transaction/:transactionId/category',
    ExpressAdapter.toRequestHandler(
      serviceCollection.updateTransactionCategoryController.update
    )
  );

  // /wallet
  router.get(
    '/wallet/user/:userId',
    ExpressAdapter.toRequestHandler(serviceCollection.getWalletController.get)
  );

  return router;
};
