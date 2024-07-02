import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // remove all non-defined properties in DTO from the request object
            forbidNonWhitelisted: true, // throw an error when non-defined properties are in the request object
            transform: true, // transform the request object to the DTO class object
            transformOptions: {
                enableImplicitConversion: true, // implicit convert query params to their respective types
            },
        }),
    );

    await app.listen(3000);
}

bootstrap();
