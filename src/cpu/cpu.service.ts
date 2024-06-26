import { Injectable } from '@nestjs/common';
import { PowerService } from '../power/power.service';

@Injectable()
export class CpuService {
    constructor(private powerService: PowerService) {}

    compute(a: number, b: number) {
        const spent = (a + b) / 2;
        console.log(`Computing spent ${spent} watts of power`);
        this.powerService.supplyPower(spent);
        return a + b;
    }
}
