import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware';
import cookieParser from 'cookie-parser';
import { IServiceCollection } from './routes/service-collection.interface';
import { createRouter } from './routes/routes';
import { createServiceCollection } from './routes/service-collection';

export const createApp = (serviceCollection: IServiceCollection) => {
  const router = createRouter(serviceCollection);
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: [serviceCollection.environment.FRONTEND_DOMAIN],
      credentials: true
    })
  );
  app.use(cookieParser());
  app.use(router);
  app.use(errorHandler);

  return app;
};

export const app = createApp(createServiceCollection());
