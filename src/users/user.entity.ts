import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Report } from '../reports/report.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    // one to many relationship with reports
    // @OneToMany('Report', 'user')
    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @OneToMany(() => Report, (report) => report.approvedBy)
    approvedReports: Report[];
}
