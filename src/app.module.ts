import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Report } from './reports/report.entity';
import { ReportModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            database: 'AnyaPawnBroker',
            entities: [User, Report],
            username: 'sa',
            password: '1',
            logging: true,
            synchronize: true, // for development only: auto sync schema with database
        }),
        UsersModule,
        ReportModule,
        AuthModule,
    ],
})
export class AppModule {}
