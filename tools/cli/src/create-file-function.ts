import { ChatCompletionTool } from 'openai/resources';

export const CREATE_FILE_FUNCTION: ChatCompletionTool = {
  type: 'function',
  function: {
    name: 'create_file',
    description: 'Creates a file with the given name and content',
    parameters: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the file to create, e.g. entity.ts'
        },
        content: {
          type: 'string',
          description: 'The code content of the file'
        }
      },
      required: ['name', 'content']
    }
  }
};
