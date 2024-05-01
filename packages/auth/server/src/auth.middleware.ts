import { AccessToken } from '@kaizen/auth';
import {
  Middleware,
  MiddlewareRequest,
  MiddlewareResponse
} from '@kaizen/core-server';
import jwt from 'jsonwebtoken';

export const authenticate: (accessTokenSecret: string) => Middleware =
  (accessTokenSecret: string) =>
  async (req: MiddlewareRequest, res: MiddlewareResponse, next: () => void) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        res.send(401);
        return next();
      }

      // Throws an error if the token is invalid
      const user = jwt.verify(token, accessTokenSecret) as AccessToken;
      req.user = user;
      return next();
    } catch {
      res.send(401);
      return next();
    }
  };
