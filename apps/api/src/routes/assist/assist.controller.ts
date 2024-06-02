import { Request, Response } from 'express';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import {
  ITranscriptionProvider,
  TranscribeCommand
} from '@kaizen/assist-server';

export class AssistController {
  constructor(
    private readonly _transcriptionProvider: ITranscriptionProvider
  ) {}

  public transcribe(req: Request, res: Response) {
    const fileName = `${uuid()}.wav`;
    const fileStream = fs.createWriteStream(fileName);
    req.pipe(fileStream);

    fileStream.on('finish', async () => {
      const transcription = await this._transcriptionProvider.transcribe({
        relativeMp3Path: fileName
      } satisfies TranscribeCommand);

      fs.unlinkSync(fileName);
      res.status(200).json(transcription);
    });

    fileStream.on('error', (err) => {
      console.error(err);
      res.sendStatus(500);
    });
  }
}
