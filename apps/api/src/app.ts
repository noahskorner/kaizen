import express from 'express';
import cors from 'cors';
import { router } from './routes/routes';
import { errorHandler } from './middleware';

export const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000']
  })
);
app.use(router);
app.use(errorHandler);
