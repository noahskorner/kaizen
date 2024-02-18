import { CreateLocationQuery } from './create-location.query';

export interface UpdateLocationQuery extends CreateLocationQuery {
  id: string;
}
