import express from 'express';
import cors from 'cors';

export const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000']
  })
);
app.use('/', (_, res) => {
  res.sendStatus(200);
});
