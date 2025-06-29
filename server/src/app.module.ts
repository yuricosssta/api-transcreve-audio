import { Module } from '@nestjs/common';
import { TranscribeController } from './transcribe/transcribe.controller';
import { TranscribeService } from './transcribe/transcribe.service';

@Module({
  imports: [],
  controllers: [TranscribeController], 
  providers: [TranscribeService],
})
export class AppModule {}
