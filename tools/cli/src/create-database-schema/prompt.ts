import { CreateFileChatCompletion } from '../create-file-chat-completion';
import { createPrompt } from '../create-prompt';
import { openai } from '../openai';
import {
  CREATE_DATABASE_CODE_SCHEMA,
  CREATE_DATABASE_FILE_SCHEMA
} from './schema';

export const createDatabaseSchema = async (
  featurePrompt: string
): Promise<CreateFileChatCompletion> => {
  const prompt = createPrompt(
    featurePrompt,
    'You are tasked with creating the database schema file for the given user story.',
    CREATE_DATABASE_FILE_SCHEMA,
    CREATE_DATABASE_CODE_SCHEMA
  );

  const response = await openai.chat.completions.create(prompt);

  return { name: 'create-database-schema', prompt, response };
};
