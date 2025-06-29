import { Controller, Post, Body } from '@nestjs/common';
import { TranscribeService } from './transcribe.service';

@Controller('transcribe')
export class TranscribeController {
  constructor(private readonly transcribeService: TranscribeService) {}

  @Post('youtube')
  async transcribeYoutube(@Body('youtubeUrl') youtubeUrl: string) { 
    return this.transcribeService.transcribeFromYoutube(youtubeUrl);
  }
}
