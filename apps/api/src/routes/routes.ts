import { Response, Router } from 'express';
import { UserController } from './user/user.controller';

const userController = new UserController();

const router = Router();
router.get('/', (_, res: Response) => {
  return res.sendStatus(200);
});
router.post('/user', userController.create);

export { router };
