import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
    providers: [PowerService], // must have to use the DI pattern
    exports: [PowerService], // optional: allows the PowerService to be used in other modules
})
export class PowerModule {}
