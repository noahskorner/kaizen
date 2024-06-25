import { createPrismaSchema } from './1-create-prisma-schema/create-prisma-schema.template';
import { createRecord } from './2-create-record/create-record.template';
import { createGetEntityQuery } from './3-create-get-entity-query/create-get-entity-query';
import { createGetEntityRepositoryInterface } from './4-create-get-entity-repository-interface/create-get-entity-repository-interface.template';
import { createGetEntityCommand } from './5-create-get-entity-command/create-get-entity-command.template';
import { createGetEntityServiceInterface } from './6-create-get-entity-service-interface/create-get-entity-service-interface.template';
import { createGetEntityService } from './8-create-get-entity-service/create-get-entity-service';
import { createGetEntityController } from './9-create-get-entity-controller/create-get-entity-controller';

export const generate = (entity: string, organization: string) => {
  return [
    createPrismaSchema(entity),
    createRecord(entity),
    createGetEntityQuery(entity),
    createGetEntityRepositoryInterface(entity),
    createGetEntityCommand(entity),
    createGetEntityServiceInterface(entity),
    createGetEntityRepositoryInterface(entity),
    createGetEntityService(entity, organization),
    createGetEntityController(entity, organization)
  ];
};
