import { ServiceEventType } from './service-event-type';

export interface LoginSuccessEvent {
  type: ServiceEventType.LOGIN;
  payload: {
    userId: string;
  };
}

export type ServiceEvent = LoginSuccessEvent;
