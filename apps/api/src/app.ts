import { CreateUserSuccessEvent, ServiceEventType } from '@kaizen/core-server';
import { AppBuilder } from './app-builder';
import { ServiceCollectionBuilder } from './service-collection.builder';

const serviceCollection = new ServiceCollectionBuilder().build();

const appBuilder = new AppBuilder()
  .withServiceCollection(serviceCollection)
  .withListeners({
    [ServiceEventType.CREATE_USER_SUCCESS]: [
      // When a user is created, create a wallet for them
      (event: CreateUserSuccessEvent) =>
        serviceCollection.createWalletService.create(event.payload)
    ]
  });

export const app = appBuilder.build();
