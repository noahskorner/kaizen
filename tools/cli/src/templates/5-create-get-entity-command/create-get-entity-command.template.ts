import { File } from '../../file';
import { cap } from '../capitalize';

export const createGetEntityCommand = (entity: string) => {
  return {
    dir: 'shared',
    name: `get-${entity}.command.ts`,
    content: `  
    export interface Get${cap(entity)}Command {
      ${entity}Id: string;
    }`
  } satisfies File;
};
