import { File } from '../../file';
import { cap } from '../capitalize';

export const createGetEntityService = (
  entity: string,
  organization: string
) => {
  return {
    dir: 'server',
    name: `get-${entity}.service.ts`,
    content: `
        import {
        IGet${cap(entity)}Repository,
        ${cap(entity)},
        Get${cap(entity)}Command,
        IGet${cap(entity)}Service
        } from '@${organization}/${entity}';
        import { Service } from '@${organization}/core-server';
        import { ErrorCode, ServiceResponse } from '@${organization}/core';

        export class Get${cap(entity)}Service extends Service implements IGet${cap(entity)}Service {
        constructor(private readonly _get${cap(entity)}Repository: IGet${cap(entity)}Repository) {
            super();
        }

        public async get(
            command: Get${cap(entity)}Command
        ): Promise<ServiceResponse<${cap(entity)} | null>> {
            const ${entity} = await this._get${cap(entity)}Repository.get({ ${entity}Id: command.${entity}Id });

            if (${entity} == null) {
            return this.failure({
                code: ErrorCode.GET_${entity.toUpperCase()}_NOT_FOUND,
                params: { ${entity}Id: command.${entity}Id }
            });
            }

            return this.success(${entity});
        }
        }
    `
  } satisfies File;
};
