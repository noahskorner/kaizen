import { File } from '../../file';
import { cap } from '../capitalize';

export const createRecord = (entity: string): File => {
  return {
    dir: 'shared',
    name: `${entity}-record.ts`,
    content: `
    // eslint-disable-next-line no-restricted-imports
    export type { ${cap(entity)}Record } from '@prisma/client';`
  } satisfies File;
};
