import { ServiceEvent } from './service-event';
import { ServiceEventHandler } from './service-event-handlers';
import { ServiceEventType } from './service-event-type';

export interface IServiceEventBus {
  subscribe: <T extends ServiceEventType>(
    serviceEventType: T,
    handler: ServiceEventHandler<T>
  ) => Promise<void>;
  publish: <T extends ServiceEventType>(
    serviceEvent: Extract<ServiceEvent, { type: T }>
  ) => Promise<void>;
}
