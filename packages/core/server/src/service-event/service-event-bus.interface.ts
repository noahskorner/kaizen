import { ServiceEvent } from './service-event';
import { ServiceEventListener } from './service-event-listener';
import { ServiceEventType } from './service-event-type';

export interface IServiceEventBus {
  subscribe(type: ServiceEventType, listener: ServiceEventListener): void;
  publish(event: ServiceEvent): void;
}
