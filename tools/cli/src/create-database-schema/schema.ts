export const CREATE_DATABASE_FILE_SCHEMA = `server/entity-record.prisma`;

export const CREATE_DATABASE_FILE_EXAMPLE = 'server/user-record.prisma';

export const CREATE_DATABASE_CODE_SCHEMA = `
  \`\`\`
  model EntityRecord {
    id           String              @id @default(uuid()) @map("id")
    createdAt    DateTime            @default(now()) @map("created_at")
    updatedAt    DateTime            @default(now()) @updatedAt @map("updated_at")
    @@map("entity")
  }
  \`\`\`
`;

export const CREATE_DATABASE_CODE_EXAMPLE = `
  \`\`\`
  model UserRecord {
    id           String              @id @default(uuid()) @map("id")
    createdAt    DateTime            @default(now()) @map("created_at")
    updatedAt    DateTime            @default(now()) @updatedAt @map("updated_at")
    @@map("user")
    email        String              @unique
  }
  \`\`\`
`;
