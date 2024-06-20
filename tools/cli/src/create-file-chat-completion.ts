import {
  ChatCompletion,
  ChatCompletionCreateParamsNonStreaming
} from 'openai/resources';

export interface CreateFileChatCompletion {
  name: 'create-database-schema' | 'create-service-impl';
  prompt: ChatCompletionCreateParamsNonStreaming;
  response: ChatCompletion;
}
