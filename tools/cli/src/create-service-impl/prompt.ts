import { CreateFileChatCompletion } from '../create-file-chat-completion';
import { createPrompt } from '../create-prompt';
import { openai } from '../openai';
import {
  CREATE_SERVICE_IMPL_CODE_SCHEMA,
  CREATE_SERVICE_IMPL_FILE_SCHEMA
} from './schema';

export const createServiceImpl = async (
  featurePrompt: string
): Promise<CreateFileChatCompletion> => {
  const prompt = createPrompt(
    featurePrompt,
    'You are tasked with creating the database schema file for the given user story.',
    CREATE_SERVICE_IMPL_FILE_SCHEMA,
    CREATE_SERVICE_IMPL_CODE_SCHEMA
  );

  const response = await openai.chat.completions.create(prompt);

  return { name: 'create-service-impl', prompt, response };
};
