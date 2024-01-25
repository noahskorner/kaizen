import { AccessToken } from '@kaizen/auth';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: AccessToken;
    }
  }
}
