import { CreateLocationQuery } from './create-location.query';

export interface SyncLocationQuery extends CreateLocationQuery {
  id: string;
}
