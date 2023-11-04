import { Response, Router } from 'express';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user';

const userController = new UserController();
const authController = new AuthController();

const router = Router();
router.get('/', (_, res: Response) => {
  return res.sendStatus(200);
});
router.post('/user', userController.create);
router.post('/auth', authController.login);

export { router };
