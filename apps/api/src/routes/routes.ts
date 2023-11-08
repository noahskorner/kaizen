import { Response, Router } from 'express';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user';
import { authenticate } from '../middleware/authenticate';

const userController = new UserController();
const authController = new AuthController();

const router = Router();
router.get('/', (_, res: Response) => {
  return res.sendStatus(200);
});

// /user
router.post('/user', userController.create);

// /auth
router.post('/auth', authController.login);
router.get('/auth', authController.refreshToken);
router.delete('/auth', authenticate, authController.logout);

export { router };
