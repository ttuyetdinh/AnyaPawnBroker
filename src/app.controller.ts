import { Controller, Get } from '@nestjs/common';
import { Public } from './decorators/public-access.decorator';

@Controller('app')
export class AppController {
    @Public()
    @Get()
    getHello(): string {
        return 'Hello World!';
    }
}
