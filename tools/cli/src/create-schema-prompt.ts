import { ChatCompletionMessageParam } from 'openai/resources';

export const createSchemaPrompt = (
  task: string,
  fileSchema: string,
  codeSchema: string
): ChatCompletionMessageParam => {
  return {
    role: 'system',
    content: `
      ${task}
      The file schema for this task looks like this:
      ${fileSchema}
      The code schema for this tasks looks like this:
      ${codeSchema}
      `
  };
};
