import { ServiceEventType } from './service-event-type';

export interface CreateUserSuccessEvent {
  type: ServiceEventType.CREATE_USER_SUCCESS;
  payload: {
    userId: string;
  };
}

export interface LoginSuccessEvent {
  type: ServiceEventType.LOGIN_SUCCESS;
  payload: {
    userId: string;
  };
}

export interface SyncAccountsSuccessEvent {
  type: ServiceEventType.SYNC_ACCOUNTS_SUCCESS;
  payload: {
    userId: string;
  };
}

export type ServiceEvent =
  | CreateUserSuccessEvent
  | LoginSuccessEvent
  | SyncAccountsSuccessEvent;
