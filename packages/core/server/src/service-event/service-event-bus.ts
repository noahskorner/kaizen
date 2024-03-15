import { ServiceEvent } from './service-event';
import { ServiceEventListener } from './service-event-listener';
import { ServiceEventType } from './service-event-type';

export class ServiceEventBus {
  private listeners: Partial<Record<ServiceEventType, ServiceEventListener[]>> =
    {};

  public subscribe(type: ServiceEventType, listener: ServiceEventListener) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type]!.push(listener);
  }

  public publish(event: ServiceEvent) {
    const listensers = this.listeners[event.type] ?? [];
    for (const listenser of listensers) {
      listenser(event);
    }
  }
}
