import { ServiceEventType } from './service-event-type';

export interface CreateUserSuccessEvent {
  type: ServiceEventType.CREATE_USER_SUCCESS;
  payload: {
    userId: string;
  };
}

export type ServiceEvent = CreateUserSuccessEvent;
