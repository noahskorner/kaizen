import { ServiceEvent } from './service-event';
import { IServiceEventBus } from './service-event-bus.interface';
import {
  ServiceEventHandler,
  ServiceEventHandlers
} from './service-event-handlers';
import { ServiceEventType } from './service-event-type';

export class ServiceEventBus implements IServiceEventBus {
  private handlers: Partial<ServiceEventHandlers> = {};

  public async subscribe<T extends ServiceEventType>(
    serviceEventType: T,
    handler: ServiceEventHandler<T>
  ): Promise<void> {
    if (!(serviceEventType in this.handlers)) {
      this.handlers[serviceEventType] = [];
    }

    this.handlers[serviceEventType]!.push(handler);
    return Promise.resolve();
  }

  public async publish<T extends ServiceEventType>(
    serviceEvent: Extract<ServiceEvent, { type: T }>
  ): Promise<void> {
    if (!(serviceEvent.type in this.handlers)) {
      return Promise.resolve();
    }

    const handlers = this.handlers[
      serviceEvent.type
    ]! as ServiceEventHandler<T>[];
    for (const handler of handlers) {
      await handler(serviceEvent);
    }
    return Promise.resolve();
  }
}
