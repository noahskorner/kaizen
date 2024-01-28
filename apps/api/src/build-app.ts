import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware';
import cookieParser from 'cookie-parser';
import { IServiceCollection } from './service-collection.interface';
import { buildRouter } from './routes/build-router';

export const buildApp = (serviceCollection: IServiceCollection) => {
  const router = buildRouter(serviceCollection);

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
