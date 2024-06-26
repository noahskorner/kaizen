import path from 'path';
import dotnev from 'dotenv';
dotnev.config({ path: path.resolve(__dirname + '/../.env') });
import { createPrismaSchema } from './templates/1-create-prisma-schema/create-prisma-schema.template';
import { openai } from './openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import { getUserInput } from './get-user-input';
import { generate } from './templates';
import fs from 'fs';

const nova = async () => {
  const feature = await getUserInput('Please describe your feature: ');

  // Extract resource name agent
  const extractResourceNameResponse = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `
        You are a code scaffolding assitant.
        You will be given a description of a feature, and your job is to extract the name of the resource.
        You can only respond with a single word.
        For example, if the description is "A user can create a post", you should respond with "user" or "post".
        `
      },
      {
        role: 'user',
        content: feature
      }
    ]
  });

  // Create prisma schema agent
  const entity = extractResourceNameResponse.choices[0].message.content!;

  const files = generate(entity, 'organization');
  for (const file of files) {
    const filePath = path.join(__dirname, 'output', file.name);
    fs.writeFileSync(filePath, file.content);
  }

  const prismaSchema = createPrismaSchema(entity);
  const messages: Array<ChatCompletionMessageParam> = [
    {
      role: 'system',
      content: `
      You are a code scaffolding assistant.
      You will be given a code snippet of a prisma model.
      Your job is to update the code snippet.
      For example, if you are given the following prisma model:
      ${createPrismaSchema('user')}
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
      Your response should always be a valid single code block. Do not return backticks.
      `
    },
    {
      role: 'user',
      content: prismaSchema.content
    }
  ];
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: messages
  });
  messages.push(response.choices[0].message);
  console.log(response.choices[0].message.content);

  let command = '';
  // eslint-disable-next-line no-constant-condition
  while (true) {
    command = await getUserInput('');
    if (command === '/bye') {
      break;
    }
    messages.push({
      role: 'user',
      content: command
    });
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages
    });
    console.log(response.choices[0].message.content);
  }
};

nova();
