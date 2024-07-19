import { File } from '../../file';
import { cap } from '../capitalize';

export const createGetEntityQuery = (entity: string) => {
  return {
    dir: 'shared',
    name: `get-${entity}.query.ts`,
    content: `  
    export interface Get${cap(entity)}Query {
      ${entity}Id: string;
    }`
  } satisfies File;
};
