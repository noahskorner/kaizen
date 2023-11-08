import express from 'express';
import cors from 'cors';
import { router } from './routes/routes';
import { errorHandler } from './middleware';
import cookieParser from 'cookie-parser';
import { AccessToken } from '@kaizen/core';
import { environment } from '@kaizen/env';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: AccessToken;
    }
  }
}

export const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [environment.API_DOMAIN]
  })
);
app.use(cookieParser());
app.use(router);
app.use(errorHandler);
