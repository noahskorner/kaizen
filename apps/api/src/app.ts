import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware';
import cookieParser from 'cookie-parser';
import { AccessToken } from '@kaizen/auth';
import { serverEnvironment } from '@kaizen/env-server';
import { IServiceCollection } from './routes/service-collection.interface';
import { ServiceCollection } from './routes/service-collection';
import { createRouter } from './routes/routes';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: AccessToken;
    }
  }
}

const createApp = (serviceCollection: IServiceCollection) => {
  const router = createRouter(serviceCollection);
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: [serverEnvironment.FRONTEND_DOMAIN],
      credentials: true
    })
  );
  app.use(cookieParser());
  app.use(router);
  app.use(errorHandler);

  return app;
};

export const app = createApp(ServiceCollection);
