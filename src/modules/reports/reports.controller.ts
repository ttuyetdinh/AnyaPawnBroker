import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { Public } from '../../decorators/public-access.decorator';
import { Roles } from '../../decorators/role.decorator';
import { Role } from '../../enums/role.enum';
import { CurrentUserInterceptor } from '../../interceptors/current-user.interceptor';
import { DateTransformToLocal } from '../../interceptors/date-transform.interceptor';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { CreateReportDto } from './dtos/create-report.dto';
import { QueryParamsReportDto } from './dtos/queryparams-report.dto';
import { ReportDto } from './dtos/report.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { ReportService } from './reports.service';

@Serialize(ReportDto) // post-interceptor
@DateTransformToLocal() // post-interceptor
@UseInterceptors(CurrentUserInterceptor) // pre-interceptor
@Controller('report')
export class ReportController {
    constructor(private reportService: ReportService) {}

    @Public()
    @Get()
    async getReport(@Query() query: QueryParamsReportDto) {
        // get report
        // return this.reportService.findAll();
        return this.reportService.findAllWithFilter(query);
    }

    @Roles(Role.USER)
    @Get('/:id')
    async getReportById(@Param('id') id: string) {
        // get report by id
        return this.reportService.findById(id);
    }

    @Roles(Role.USER)
    @Post()
    async createReport(@Body() createReportDto: CreateReportDto, @CurrentUser() user: any) {
        // create report
        return this.reportService.create(createReportDto, user);
    }

    @Roles(Role.APPROVER)
    @Post('/:id/approve')
    async approveReport(@Param('id') id: string, @CurrentUser() user: any) {
        // approve report
        return this.reportService.approveReport(id, user);
    }

    @Roles(Role.USER)
    @Patch('/:id')
    async updateReport(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
        // update report
        return this.reportService.update(id, updateReportDto);
    }

    @Roles(Role.USER)
    @Delete('/:id')
    async deleteReport(@Param('id') id: string) {
        // delete report
        return this.reportService.remove(id);
    }
}
