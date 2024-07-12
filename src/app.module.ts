import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresConfigService } from './config/database.config';
import { JwtGuard } from './guard/jwt.guard';
import { AuthModule } from './modules/auth/auth.module';
import { ReportModule } from './modules/reports/reports.module';
import { UsersModule } from './modules/users/users.module';

@Module({
    controllers: [AppController],
    providers: [
        AppService,
        {
            // enable the JwtGuard globally
            provide: APP_GUARD,
            useClass: JwtGuard,
        },
    ],
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, //make the config module global hence can be used in other modules without importing
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule], //import ConfigModule to use ConfigService in PostgresConfigService because of async
            useClass: PostgresConfigService, //get the config from instance from TypeOrmOptionsFactory
        }),
        UsersModule,
        ReportModule,
        AuthModule,
    ],
})
export class AppModule {}
