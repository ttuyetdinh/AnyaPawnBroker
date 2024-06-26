import { Body, Controller, Post } from '@nestjs/common';
import { CpuService } from '../cpu/cpu.service';
import { DiskService } from '../disk/disk.service';

@Controller('computer')
export class ComputerController {
    constructor(
        private diskService: DiskService,
        private cpuService: CpuService,
    ) {}

    @Post('compute')
    compute(@Body() body: { a: number; b: number }) {
        return this.cpuService.compute(body.a, body.b);
    }

    @Post('write')
    write(@Body() body: { data: string }) {
        return this.diskService.write(body.data);
    }
}
