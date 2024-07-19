import { File } from '../../file';
import { cap } from '../capitalize';

export const createGetEntityController = (
  entity: string,
  organization: string
) => {
  return {
    dir: 'server',
    name: `get-${entity}.controller.ts`,
    content: `
      import { Get${cap(entity)}Request, IGet${cap(entity)}Service } from '@${organization}/user';
      import { Controller, RequestHandlerBuilder } from '@${organization}/core-server';

      export class Get${cap(entity)}Controller extends Controller {
        constructor(private readonly _get${cap(entity)}Service: IGet${cap(entity)}Service) {
          super();
        }

        public get = new RequestHandlerBuilder()
          .use(async (req, res, next) => {
            const request = req.body as Get${cap(entity)}Request;
            const response = await this._get${cap(entity)}Service.get(request);

            if (response.type === 'FAILURE') {
              return this.badRequest(res, next, response);
            }

            return this.ok(res, next, response);
          })
          .build();
      }
    `
  } satisfies File;
};
