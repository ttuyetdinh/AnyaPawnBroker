import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

// this file use to config the database connection from the .env file for the typeorm
// this run independently from the app
config();

const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    database: configService.get('DB_NAME'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    entities: ['src/**/*.entity.{ts,js}'],
    migrations: ['src/migrations/*.{ts,js}'],
});
