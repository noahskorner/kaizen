import { ChatCompletionCreateParamsNonStreaming } from 'openai/resources';
import { GLOBAL_PROMPT } from './global-prompt';
import { CREATE_FILE_FUNCTION } from './create-file-function';
import { createSchemaPrompt } from './create-schema-prompt';

export const createPrompt = (
  feature: string,
  task: string,
  fileSchema: string,
  codeSchema: string
): ChatCompletionCreateParamsNonStreaming => {
  return {
    model: 'gpt-4o',
    messages: [
      GLOBAL_PROMPT,
      createSchemaPrompt(task, fileSchema, codeSchema),
      {
        role: 'user',
        content: feature
      }
    ],
    tools: [CREATE_FILE_FUNCTION]
  } satisfies ChatCompletionCreateParamsNonStreaming;
};
