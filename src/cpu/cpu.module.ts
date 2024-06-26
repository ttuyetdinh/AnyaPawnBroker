import { Module } from '@nestjs/common';
import { PowerModule } from '../power/power.module';
import { CpuService } from './cpu.service';

@Module({
    providers: [CpuService], // register to the DI container
    exports: [CpuService], // export for other modules to use
    imports: [PowerModule], // import from the DI container
})
export class CpuModule {}
