import { Response, Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import {
  userController,
  authController,
  accountController
} from './service-collection';

// Routes
const router = Router();
router.get('/', (_, res: Response) => {
  return res.sendStatus(200);
});

// /user
router.post('/user', userController.create);
router.post('/user/link-token', authenticate, userController.createLinkToken);

// /auth
router.post('/auth', authController.login);
router.get('/auth', authController.refreshToken);
router.delete('/auth', authenticate, authController.logout);

// /account
router.post('/account', authenticate, accountController.create);

export { router };
