// import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
// import { TranscriptionService } from './transcription.service';
// import { CreateTranscriptionDto } from './dto/transcription.dto';

// @Controller('transcription')
// export class TranscriptionController {
//   constructor(private readonly transcriptionService: TranscriptionService) {}

//   @Post()
//   @HttpCode(HttpStatus.OK)
//   create(@Body() createTranscriptionDto: CreateTranscriptionDto) {
//     return this.transcriptionService.transcribe(createTranscriptionDto.url);
//   }
// }

// ------------------------------------------------ //
import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TranscriptionService } from './transcription.service';
import type { File as MulterFile } from 'multer';

@Controller('transcription')
export class TranscriptionController {
  constructor(private readonly transcriptionService: TranscriptionService) { }

  // Transcrição via URL do YouTube
  @Post()
  async transcribeFromYoutube(@Body('url') url: string) {
    return this.transcriptionService.transcribeFromYoutube(url);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async transcribeFromFile(@UploadedFile() file: MulterFile) {
    return this.transcriptionService.transcribeFromFile(file);
  }
}

