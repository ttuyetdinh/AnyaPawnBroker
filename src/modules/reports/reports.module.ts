import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { Report } from './report.entity';
import { ReportController } from './reports.controller';
import { ReportService } from './reports.service';

@Module({
    providers: [ReportService],
    controllers: [ReportController],
    imports: [TypeOrmModule.forFeature([Report]), UsersModule, AuthModule], // import the Report entity, register the repository
})
export class ReportModule {}
