import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import  SummaryService  from './summary.service';

@Controller('summary')
export class SummaryController {
    constructor(private readonly summaryService: SummaryService) {}

    @HttpCode(HttpStatus.OK)
    @Post('text')
    summarize(@Body('text') text: string): Promise<string> {
        return this.summaryService.summarizeText(text);
    }
}
