import { Response, Router } from 'express';
import { UserController } from './user';

const userController = new UserController();

const router = Router();
router.get('/', (_, res: Response) => {
  return res.sendStatus(200);
});
router.post('/user', userController.create);

export { router };
