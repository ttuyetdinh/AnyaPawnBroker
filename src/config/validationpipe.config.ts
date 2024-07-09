import { ValidationPipe } from '@nestjs/common';

export class ValidationPipeConfig extends ValidationPipe {
    constructor() {
        super({
            whitelist: true, // remove all non-defined properties in DTO from the request object
            forbidNonWhitelisted: true, // throw an error when non-defined properties are in the request object
            transform: true, // transform the request object to the DTO class object
            transformOptions: {
                enableImplicitConversion: true, // implicit convert query params to their respective types
            },
        });
    }
}
