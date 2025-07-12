import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SummaryController } from './summary.controller';
import  SummaryService  from './summary.service';

@Module({
  imports: [HttpModule],
  controllers: [SummaryController],
  providers: [SummaryService]
})
export class SummaryModule {}
