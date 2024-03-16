import { AccessToken } from '@kaizen/auth';
import { IServiceCollection } from '../src/service-collection.interface';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: AccessToken;
    }

    interface Application {
      serviceCollection: IServiceCollection;
    }
  }
}
