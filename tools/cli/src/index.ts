import path from 'path';
import dotnev from 'dotenv';
dotnev.config({ path: path.resolve(__dirname + '/../.env') });
import { createPrismaSchema } from './templates/1-create-prisma-schema/create-prisma-schema.template';
import { openai } from './openai';

const nova = async () => {
  // Extract resource name agent
  // const response = await openai.chat.completions.create({
  //   model: 'gpt-3.5-turbo',
  //   messages: [
  //     {
  //       role: 'system',
  //       content: `
  //       You are a code scaffolding assitant.
  //       You will be given a description of a feature, and your job is to extract the name of the resource.
  //       You can only respond with a single word.
  //       For example, if the description is "A user can create a post", you should respond with "user" or "post".
  //       `
  //     }
  //   ]
  // });
  // Create prisma schema agent
  const entity = 'todos';
  const USER_PRISMA_MODEL = createPrismaSchema('user');
  const prismaSchema = createPrismaSchema(entity);
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `
        You are a code scaffolding assistant.
        You will be given a code snippet of a prisma model.
        Your job is to update the code snippet.
        For example, if you are given the following prisma model:
        ${USER_PRISMA_MODEL}
        And the following prompt:
        'Add an email, password, and name column'
        You should return this:
        model UserRecord {
            id           String              @id @default(uuid()) @map("id")
            createdAt    DateTime            @default(now()) @map("created_at")
            updatedAt    DateTime            @default(now()) @updatedAt @map("updated_at")
            email        String              @map("email")
            password     String              @map("password")
            name         String              @map("name")
            @@map("user")
        }
        The name of the model should always be singular.
        `
      },
      {
        role: 'user',
        content: prismaSchema.content
      }
    ]
  });

  console.log(response.choices[0].message.content);
};

nova();
