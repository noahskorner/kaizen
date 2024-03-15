import { ServiceEvent } from './service-event';

export type ServiceEventListener = (event: ServiceEvent) => void;
