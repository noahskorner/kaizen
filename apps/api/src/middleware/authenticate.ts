import { AccessToken } from '@kaizen/auth';
import { IServerEnvironment } from '@kaizen/env-server';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate =
  (environment: IServerEnvironment) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) return res.sendStatus(401);

      req.user = jwt.verify(
        token,
        environment.ACCESS_TOKEN_SECRET
      ) as AccessToken;
      return next();
    } catch {
      return res.sendStatus(401);
    }
  };
