import { ChatCompletion } from 'openai/resources';
import { File } from './file';

export const toFile = (response: ChatCompletion): File | null => {
  const functionCall =
    response.choices
      .at(0)
      ?.message?.tool_calls?.find(
        (toolcall) => toolcall?.function?.name === 'create_file'
      )?.function?.arguments ?? null;

  return functionCall ? (JSON.parse(functionCall) as File) : null;
};
