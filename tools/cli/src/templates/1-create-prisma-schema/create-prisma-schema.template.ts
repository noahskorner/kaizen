import { File } from '../../file';
import { cap } from '../capitalize';

export const createPrismaSchema = (entity: string): File => {
  return {
    name: `${entity}.prisma`,
    content: `model ${cap(entity)}Record {
        id           String              @id @default(uuid()) @map("id")
        createdAt    DateTime            @default(now()) @map("created_at")
        updatedAt    DateTime            @default(now()) @updatedAt @map("updated_at")
        
        @@map("${entity}")
    }`
  } satisfies File;
};
