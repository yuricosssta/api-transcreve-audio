import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TranscriptionController } from './transcription.controller';
import { TranscriptionService } from './transcription.service';

@Module({
  imports: [HttpModule],
  controllers: [TranscriptionController],
  providers: [TranscriptionService],
})
export class TranscriptionModule {}