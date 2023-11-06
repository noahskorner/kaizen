import express from 'express';
import cors from 'cors';
import { router } from './routes/routes';
import { errorHandler } from './middleware';
import cookieParser from 'cookie-parser';

export const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000']
  })
);
app.use(cookieParser());
app.use(router);
app.use(errorHandler);
