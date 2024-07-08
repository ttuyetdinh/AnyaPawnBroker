import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostgresConfigService } from './config/database.config';
import { UsersModule } from './users/users.module';

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, //make the config module global hence can be used in other modules without importing
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule], //import ConfigModule to use ConfigService in PostgresConfigService because of async
            useClass: PostgresConfigService, //get the config from instance from TypeOrmOptionsFactory
        }),
        UsersModule,
        // ReportModule,
        AuthModule,
    ],
})
export class AppModule {}
