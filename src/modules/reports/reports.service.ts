import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { QueryParamsReportDto } from './dtos/queryparams-report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) {
        //@InjectRepository(Report) is a decorator that injects the repository instance into the service
        this.repo = repo;
    }

    async findById(id: string) {
        // findOne can join the relations, findOnoBy can't
        const report = await this.repo.findOne({
            where: { id: id },
            relations: ['user', 'approvedBy'],
        });
        return report;
    }

    async findAll() {
        const reports = this.repo.find();
        return reports;
    }

    async findAllWithFilter(queryParams: QueryParamsReportDto) {
        const query = this.repo.createQueryBuilder().select('*').where('1=1');

        Object.entries(queryParams).forEach(([key, value]) => {
            if (!value) {
                return;
            }
            if (typeof value === 'string') {
                query.andWhere(`LOWER(${key}) LIKE LOWER(:${key})`, { [key]: `%${value}%` });
            } else if (typeof value === 'number') {
                query.andWhere(`${key} = :${key}`, { [key]: value });
            }
        });

        const reports = query.getRawMany();
        return reports;
    }

    async create(report: CreateReportDto, user: any) {
        const toBeCreate = this.repo.create(report); // create a new instance of the entity in the schema

        // assign the user to the report
        toBeCreate.user = user;

        const result = await this.repo.save(toBeCreate); // save the instance to the database
        return result;
    }

    async update(id: string, attrs: Partial<Report>) {
        let report = await this.repo.findOne({
            where: { id: id },
            relations: ['user', 'approvedBy'],
        });

        if (!report) {
            throw new Error('Report not found');
        }

        Object.assign(report, attrs);

        // Save method skip the undefined values in the update object
        // Also, it does query the db again, and update if exsit, else insert
        // save can use with listener and subscriber
        await this.repo.save(report);

        return report;
    }

    async approveReport(id: string, user: any) {
        let report = await this.repo.findOne({
            where: { id: id },
            relations: ['user', 'approvedBy'],
        });

        if (!report) {
            return null;
        }

        report.approvedBy = user;
        report.isApproved = true;
        report.approved_at = new Date();
        await this.repo.save(report);

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

        attrs.updated_at = new Date(); // manually update the updated_at field
        // update skip the undefined values in the update objects
        // update can't work with listener and subscriber
        await this.repo.update({ id: id }, attrs);

        report = await this.repo.findOne({
            where: { id: id },
            relations: ['user', 'approvedBy'],
        });

        return report;
    }
}
