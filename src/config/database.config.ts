import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(
        connectionName?: string,
    ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        const isProduction = this.configService.get('NODE_ENV') === 'production';
        const entitiesPath = isProduction ? 'dist/**/*.entity.{ts,js}' : 'src/**/*.entity.{ts,js}';
        return {
            type: 'postgres',
            host: this.configService.get('DB_HOST'),
            port: this.configService.get('DB_PORT'),
            database: this.configService.get('DB_NAME'),
            username: this.configService.get('DB_USER'),
            password: this.configService.get('DB_PASSWORD'),
            entities: [],
            autoLoadEntities: true, //automatically load entities from the location of the running code
            logging: true,
            synchronize: !isProduction, // for development only: auto sync schema with database
        };
    }
}
