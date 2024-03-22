import { ServiceEvent } from './service-event';
import { ServiceEventType } from './service-event-type';

export type ServiceEventHandler<T extends ServiceEventType> = (
  event: Extract<ServiceEvent, { type: T }>
) => Promise<void>;

export type ServiceEventHandlers = {
  [T in ServiceEventType]: Array<ServiceEventHandler<T>>;
};
