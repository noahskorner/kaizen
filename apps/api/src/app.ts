import { ServiceEvent, ServiceEventType } from '@kaizen/core-server';
import { AppBuilder } from './app-builder';
import { ServiceCollectionBuilder } from './service-collection.builder';
import { UpdateWalletCommand } from '@kaizen/wallet';
import { v4 as uuid } from 'uuid';

const serviceCollection = new ServiceCollectionBuilder().build();

const appBuilder = new AppBuilder()
  .withServiceCollection(serviceCollection)
  .withListeners({
    [ServiceEventType.CREATE_USER_SUCCESS]: [
      // When a user is created, create a wallet for them
      (event: ServiceEvent) =>
        serviceCollection.createWalletService.create(event.payload)
    ],
    [ServiceEventType.LOGIN_SUCCESS]: [
      // When a user logs in, give them 10 coins
      (event: ServiceEvent) => {
        const command: UpdateWalletCommand = {
          userId: event.payload.userId,
          transactionId: uuid(),
          amount: 10
        };
        serviceCollection.updateWalletService.update(command);
      }
    ]
  });

export const app = appBuilder.build();
