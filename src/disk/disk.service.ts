import { Injectable } from '@nestjs/common';
import { PowerService } from '../power/power.service';
@Injectable()
export class DiskService {
    constructor(private powerService: PowerService) {}

    write(data: string) {
        const spent = data.length / 2;
        console.log(`Writing spent ${spent} watts of power`);
        this.powerService.supplyPower(spent);
        return data;
    }
}
