import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { IServiceCollection } from './service-collection.interface';
import { buildRouter } from './routes/build-router';

export class AppBuilder {
  private _serviceCollection: IServiceCollection | null = null;

  withServiceCollection(serviceCollection: IServiceCollection) {
    this._serviceCollection = serviceCollection;

    return this;
  }

  build() {
    if (this._serviceCollection == null) {
      throw new Error(
        `The service collection must be instanstiated before we can build the application.
        Did you forget to call withServiceCollection()?`
      );
    }

    const router = buildRouter(this._serviceCollection);

    const app = express();
    app.use(express.json());
    app.use(
      cors({
        origin: [this._serviceCollection.environment.FRONTEND_DOMAIN],
        credentials: true
      })
    );
    app.use(cookieParser());
    app.use(router);

    return app;
  }
}
