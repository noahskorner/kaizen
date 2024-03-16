import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware';
import cookieParser from 'cookie-parser';
import { IServiceCollection } from './service-collection.interface';
import { buildRouter } from './routes/build-router';
import { ServiceEventListener, ServiceEventType } from '@kaizen/core-server';

export type Application = Express.Application & {
  serviceCollection: IServiceCollection;
};

export class AppBuilder {
  private _serviceCollection: IServiceCollection | null = null;

  withServiceCollection(serviceCollection: IServiceCollection) {
    this._serviceCollection = serviceCollection;

    return this;
  }

  withListeners(
    listeners: Partial<Record<ServiceEventType, ServiceEventListener[]>>
  ) {
    if (this._serviceCollection == null) {
      throw new Error(
        `The service collection must be instanstiated before we can add listeners. 
        Did you forget to call withServiceCollection()?`
      );
    }

    Object.entries(listeners).forEach(([type, listeners]) => {
      listeners.forEach((listener) => {
        this._serviceCollection!.serviceEventBus.subscribe(
          type as ServiceEventType,
          listener
        );
      });
    });

    return this;
  }

  build(): Application {
    if (this._serviceCollection == null) {
      throw new Error(
        `The service collection must be instanstiated before we can build the application. 
        Did you forget to call withServiceCollection()?`
      );
    }

    const router = buildRouter(this._serviceCollection);

    const app = express();
    app.serviceCollection = this._serviceCollection;
    app.use(express.json());
    app.use(
      cors({
        origin: [this._serviceCollection.environment.FRONTEND_DOMAIN],
        credentials: true
      })
    );
    app.use(cookieParser());
    app.use(router);
    app.use(errorHandler);

    return app satisfies Application;
  }
}
