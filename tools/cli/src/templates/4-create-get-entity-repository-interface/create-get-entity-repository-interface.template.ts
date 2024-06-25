import { File } from '../../file';
import { cap as cap } from '../capitalize';

export const createGetEntityRepositoryInterface = (entity: string) => {
  return {
    dir: 'shared',
    name: `get-${entity}.repository.interface.ts`,
    content: `  
    import { ${cap(entity)}Record } from '../${entity}-record';

    export interface IGet${cap(entity)}Repository {
        get(query: Get${cap(entity)}Query): Promise<${cap(entity)}Record | null>;
    }
    `
  } satisfies File;
};
