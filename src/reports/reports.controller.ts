import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { CreateReportDto } from './dtos/create-report.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { ReportService } from './reports.service';

@UseGuards(JwtGuard)
// @DateTransformToLocal() // post-interceptor
@Controller('report')
export class ReportController {
    constructor(private reportService: ReportService) {}

    @Get()
    async getReport() {
        // get report
        return this.reportService.findAll();
    }
    @Get('/:id')
    async getReportById(@Param('id') id: string) {
        // get report by id
        return this.reportService.findById(id);
    }

    @Post()
    async createReport(@Body() createReportDto: CreateReportDto) {
        // create report
        return this.reportService.create(createReportDto);
    }

    @Patch('/:id')
    async updateReport(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
        // update report
        return this.reportService.update(id, updateReportDto);
    }

    @Delete('/:id')
    async deleteReport(@Param('id') id: string) {
        // delete report
        return this.reportService.remove(id);
    }
}
