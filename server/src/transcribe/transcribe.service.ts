import { Injectable } from '@nestjs/common';
import * as ytdl from 'ytdl-core';
import * as fs from 'fs';
import { exec } from 'child_process';

@Injectable()
export class TranscribeService {
  private audioPath = '/uploads/input.mp3';
  private outputPath = '/uploads/output.txt';

  async transcribeFromYoutube(url: string): Promise<{ transcription: string }> {
    if (!url || !ytdl.validateURL(url)) throw new Error('URL inválida.');

    const writeStream = fs.createWriteStream(this.audioPath);
    const audioStream = ytdl(url, { filter: 'audioonly' });

    await new Promise<void>((resolve, reject) => {
      audioStream.pipe(writeStream);
      writeStream.on('finish', () => resolve());
      writeStream.on('error', (err) => reject(err));
    });

    await new Promise<void>((resolve, reject) => {
      exec(
        `docker-compose run --rm whisper ${this.audioPath} ${this.outputPath}`,
        (error) => {
          if (error) reject(error);
          else resolve();
        },
      );
    });

    const txt = fs.readFileSync(this.outputPath, 'utf8');
    return { transcription: txt };
  }
}
