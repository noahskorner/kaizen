export const CREATE_SERVICE_IMPL_FILE_SCHEMA = `server/get-entity.service.ts`;

export const CREATE_SERVICE_IMPL_CODE_SCHEMA = `
  \`\`\`typescript
  import {
    IGetEntityRepository,
    Entity,
    GetEntityCommand,
    IGetEntityService,
  } from "@kaizen/entity";
  import { Service } from "@kaizen/core-server";
  import { ErrorCode, ServiceResponse } from "@kaizen/core";

  export class GetEntityService extends Service implements IGetEntityService {
    constructor(private readonly _getEntityRepository: IGetEntityRepository) {
      super();
    }

    public async get(
      command: GetEntityCommand
    ): Promise<ServiceResponse<Entity | null>> {
      const entity = await this._getEntityRepository.get({
        entityId: command.entityId,
      });

      if (entity == null) {
        return this.failure({
          code: ErrorCode.GET_ENTITY_NOT_FOUND,
          params: { entityId: command.entityId },
        });
      }

      return this.success(entity);
    }
  }
  \`\`\`
`;
