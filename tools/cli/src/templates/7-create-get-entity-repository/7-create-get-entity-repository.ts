import { File } from '../../file';
import { cap } from '../capitalize';

export const createGetEntityRepository = (
  entity: string,
  organization: string
) => {
  return {
    dir: 'server',
    name: `get-${entity}.repository.ts`,
    content: `
        import { Repository } from '@${organization}/core-server';
        import { Get${cap(entity)}Query, IGet${cap(entity)}Repository, ${cap(entity)}Record } from '@${organization}/${entity}';

        export class Get${cap(entity)}Repository
        extends Repository
        implements IGet${cap(entity)}Repository
        {
        public async get(query: Get${cap(entity)}Query): Promise<${cap(entity)}Record | null> {
            return await this._prisma.${entity}Record.findUnique({
            where: {
                id: query.${entity}Id
            }
            });
        }
        }
    `
  } satisfies File;
};
