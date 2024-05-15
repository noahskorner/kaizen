import {
  ErrorCode,
  TranscriptionProviderTranscriptionFailedError,
  ServiceResponse
} from '@kaizen/core';
import { TranscribeCommand } from './transcribe.command';
import { Service } from '@kaizen/core-server';
import { ITranscriptionProvider } from './transcription.provider.interface';
import OpenAI from 'openai';
import fs from 'fs';

export class OpenAITranscriptionProvider
  extends Service
  implements ITranscriptionProvider
{
  private readonly _openai: OpenAI;

  constructor(OPENAI_API_KEY: string) {
    super();
    this._openai = new OpenAI({
      apiKey: OPENAI_API_KEY
    });
  }

  public async transcribe(
    command: TranscribeCommand
  ): Promise<ServiceResponse<string>> {
    try {
      const response = await this._openai.audio.transcriptions.create({
        file: fs.createReadStream(command.relativeMp3Path),
        model: 'whisper-1'
      });

      return this.success(response.text);
    } catch (error: unknown) {
      return this.failure({
        code: ErrorCode.TRANSCRIPTION_PROVIDER_TRANSCRIPTION_FAILED,
        params: {
          error: error
        }
      } satisfies TranscriptionProviderTranscriptionFailedError);
    }
  }
}
