import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) {
        //@InjectRepository(Report) is a decorator that injects the repository instance into the service
        this.repo = repo;
    }

    async findById(id: string) {
        const result = await this.repo.findOneBy({ id: id });
        return result;
    }

    async findAll() {
        return this.repo.find();
    }

    async create(report: CreateReportDto) {
        const toBeCreate = this.repo.create(report); // create a new instance of the entity in the schema
        return this.repo.save(toBeCreate); // save the instance to the database
    }

    async update(id: string, attrs: Partial<Report>) {
        let report = await this.repo.findOneBy({ id: id });

        if (!report) {
            return null;
        }

        attrs.updated_at = new Date(); // manually update the updated_at field
        // update skip the undefined values in the update objects
        await this.repo.update({ id: id }, attrs);

        report = await this.repo.findOneBy({ id: id });

        return report;
    }

    async remove(id: string) {
        const report = await this.repo.findOneBy({ id: id });

        if (!report) {
            throw new Error('Report not found');
        }

        await this.repo.remove(report);

        return null;
    }

    // Alternative way to update:
    private async updateAlternative(id: string, attrs: Partial<Report>) {
        let report = await this.repo.findOneBy({ id: id });

        if (!report) {
            return null;
        }

        Object.assign(report, attrs);

        // Save method skip the undefined values in the update object
        // Also, it does query the db again, and update if exsit, else insert
        return this.repo.save(report);
    }
}
