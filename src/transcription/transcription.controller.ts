import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { TranscriptionService } from './transcription.service';
import { CreateTranscriptionDto } from './dto/transcription.dto';

@Controller('transcription')
export class TranscriptionController {
  constructor(private readonly transcriptionService: TranscriptionService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createTranscriptionDto: CreateTranscriptionDto) {
    return this.transcriptionService.transcribe(createTranscriptionDto.url);
  }
}