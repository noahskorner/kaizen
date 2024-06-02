import { ServiceResponse } from '@kaizen/core';
import { TranscribeCommand } from './transcribe.command';

export interface ITranscriptionProvider {
  transcribe(command: TranscribeCommand): Promise<ServiceResponse<string>>;
}
