// import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { HttpService } from '@nestjs/axios';
// import * as fs from 'fs';
// import * as path from 'path';
// import * as FormData from 'form-data';
// import { firstValueFrom } from 'rxjs';
// import YtDlpWrap from 'yt-dlp-wrap';
// import OpenAI from "openai";

// @Injectable()
// export class TranscriptionService {
//   private readonly tempDir = path.join(__dirname, '..', '..', 'temp');
//   private readonly ytDlp: YtDlpWrap;

//   constructor(
//     private readonly configService: ConfigService,
//     private readonly httpService: HttpService,
//   ) {
//     if (!fs.existsSync(this.tempDir)) {
//       fs.mkdirSync(this.tempDir);
//     }
//     this.ytDlp = new YtDlpWrap();
//   }

//   async transcribe(youtubeUrl: string): Promise<{ text: string }> {
//     if (!youtubeUrl.includes('youtube.com') && !youtubeUrl.includes('youtu.be')) {
//       throw new BadRequestException('URL do YouTube inválida.');
//     }

//     const audioPath = path.join(this.tempDir, `audio-${Date.now()}.mp3`);

//     try {
//       await this.downloadAudio(youtubeUrl, audioPath);
//       console.log("Áudio baixado com sucesso:", audioPath);
//       const transcription = await this.sendToWhisper(audioPath);
//       return { text: transcription };
//     } catch (error) {
//       console.error('Erro no processo de transcrição:', error);
//       throw new InternalServerErrorException('Falha ao transcrever o áudio.');
//     } finally {
//       if (fs.existsSync(audioPath)) {
//         fs.unlinkSync(audioPath);
//       }
//     }
//   }

//   private downloadAudio(url: string, outputPath: string): Promise<void> {
//     console.log(`Baixando áudio de: ${url}`);

//     const stream = this.ytDlp.execStream([
//       url,
//       '-f', 'bestaudio',
//       '-o', '-',
//       '--audio-format', 'mp3'
//     ]);

//     stream.pipe(fs.createWriteStream(outputPath));

//     return new Promise((resolve, reject) => {
//       stream.on('close', () => {
//         console.log('Download do áudio concluído.');
//         resolve();
//       });
//       stream.on('error', (error) => {
//         console.error('Erro ao baixar áudio com yt-dlp:', error);
//         reject(error);
//       });
//     });
//   }

//   private async sendToWhisper(filePath: string): Promise<string> {
//     // const apiKey = this.configService.get<string>('OPENAI_API_KEY');
//     // const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//     // if (!apiKey) {
//     //   throw new InternalServerErrorException('Chave da API da OpenAI não configurada.');
//     // }

//     const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//     try {
//       console.log('Enviando áudio para transcrição...');
//       const response = await openai.audio.transcriptions.create({
//       file: fs.createReadStream(filePath),
//       model: "gpt-4o-transcribe",
//     });
//         console.log('Transcrição recebida:', response.text);
//       return response.text;
//     } catch (error) {
//       console.error('Erro ao chamar a API de transcrição:', error.response?.data);
//       throw new InternalServerErrorException('Falha na comunicação com a API de transcrição.');
//     }
//   }
// }

// ------------------------------------------------ //

import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';
import * as path from 'path';
import * as FormData from 'form-data';
import { firstValueFrom } from 'rxjs';
import YtDlpWrap from 'yt-dlp-wrap';
import { File as MulterFile } from 'multer';

@Injectable()
export class TranscriptionService {
  private readonly tempDir = path.join(__dirname, '..', '..', 'temp');
  private readonly ytDlp: YtDlpWrap;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir);
    }
    this.ytDlp = new YtDlpWrap();
  }

  /**
   * Transcreve a partir de uma URL do YouTube
   */
  async transcribeFromYoutube(youtubeUrl: string): Promise<{ text: string }> {
    if (!youtubeUrl.includes('youtube.com') && !youtubeUrl.includes('youtu.be')) {
      throw new BadRequestException('URL do YouTube inválida.');
    }

    const audioPath = path.join(this.tempDir, `audio-${Date.now()}.mp3`);

    try {
      await this.downloadAudio(youtubeUrl, audioPath);
      console.log("Áudio baixado com sucesso:", audioPath);
      const transcription = await this.sendToWhisper(audioPath);
      return { text: transcription };
    } catch (error) {
      console.error('Erro no processo de transcrição:', error);
      throw new InternalServerErrorException('Falha ao transcrever o áudio.');
    } finally {
      if (fs.existsSync(audioPath)) {
        fs.unlinkSync(audioPath);
      }
    }
  }

  /**
   * Transcreve um arquivo de áudio enviado pelo usuário
   * */
  async transcribeFromFile(file: MulterFile): Promise<{ text: string }> {
  // async transcribeFromFile(file: Express.Multer.File): Promise<{ text: string }> {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado.');
    }

    const filePath = path.join(this.tempDir, `${Date.now()}-${file.originalname}`);
    fs.writeFileSync(filePath, file.buffer);

    try {
      const transcription = await this.sendToWhisper(filePath);
      return { text: transcription };
    } catch (error) {
      console.error('Erro ao transcrever arquivo enviado:', error);
      throw new InternalServerErrorException('Falha ao transcrever o áudio enviado.');
    } finally {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  }

  /**
   * Faz o download do áudio do YouTube com yt-dlp
   */
  private downloadAudio(url: string, outputPath: string): Promise<void> {
    console.log(`Baixando áudio de: ${url}`);

    const stream = this.ytDlp.execStream([
      url,
      '-f', 'bestaudio',
      '-o', '-',
      '--audio-format', 'mp3'
    ]);

    stream.pipe(fs.createWriteStream(outputPath));

    return new Promise((resolve, reject) => {
      stream.on('close', () => {
        console.log('Download do áudio concluído.');
        resolve();
      });
      stream.on('error', (error) => {
        console.error('Erro ao baixar áudio com yt-dlp:', error);
        reject(error);
      });
    });
  }

  /**
   * Envia o arquivo para o Whisper API da OpenAI
   */
  private async sendToWhisper(filePath: string): Promise<string> {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      throw new InternalServerErrorException('Chave da API da OpenAI não configurada.');
    }

    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));
    formData.append('model', 'whisper-1');

    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      ...formData.getHeaders(),
    };

    const url = 'https://api.openai.com/v1/audio/transcriptions';

    try {
      console.log('Enviando áudio para transcrição...');
      const response = await firstValueFrom(
        this.httpService.post(url, formData, { headers })
      );
      return response.data.text;
    } catch (error) {
      console.error('Erro ao chamar a API de transcrição:', error.response?.data);
      throw new InternalServerErrorException('Falha na comunicação com a API de transcrição.');
    }
  }
}
