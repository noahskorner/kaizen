import { ServiceEventBus, ServiceEventType } from '@kaizen/core-server';

export const serviceEventBus = new ServiceEventBus();
serviceEventBus.subscribe(ServiceEventType.LOGIN, (event) => {
  console.log(event);
});
