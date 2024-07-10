import { Body, Controller, Post } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportService } from './reports.service';

@Controller('report')
export class ReportController {
    constructor(private reportService: ReportService) {}

    @Post()
    createReport(@Body() createReportDto: CreateReportDto) {
        // create report
        return 'you did it';
    }
}
