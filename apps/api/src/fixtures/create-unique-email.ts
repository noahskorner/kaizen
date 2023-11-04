import { v4 as uuid } from 'uuid';

export const createUniqueEmail = () => {
  return `${uuid()}@test.com`;
};
