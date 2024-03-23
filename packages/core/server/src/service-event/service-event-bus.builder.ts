import { ServiceEventBus } from './service-event-bus';
import { IServiceEventBus } from './service-event-bus.interface';
import { ServiceEventHandler } from './service-event-handlers';
import { ServiceEventType } from './service-event-type';

export class ServiceEventBusBuilder {
  private _serviceEventBus: IServiceEventBus;

  constructor() {
    this._serviceEventBus = new ServiceEventBus();
  }

  public withHandler<T extends ServiceEventType>(
    serviceEventType: T,
    handler: ServiceEventHandler<T>
  ) {
    this._serviceEventBus.subscribe(serviceEventType, handler);

    return this;
  }

  public build() {
    return this._serviceEventBus;
  }
}
