import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipeConfig } from './config/validationpipe.config';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // middleware to validate the request body
    app.useGlobalPipes(new ValidationPipeConfig());

    await app.listen(3000);
}

bootstrap();
