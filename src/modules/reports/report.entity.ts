import {
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Report {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    price: number;

    @Column()
    brand: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    kilometers: number;

    @Column()
    lat: number;

    @Column()
    lng: number;

    @Column({ default: false })
    isApproved: boolean;

    // many to one relationship with user. This creates a default userId column on the report table
    @ManyToOne(() => User, (user) => user.reports, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'userId' }) // uses to set the fk column name
    user: User;

    @ManyToOne(() => User, (user) => user.reports, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'approvedById' }) // uses to set the fk column name
    approvedBy: User;

    @CreateDateColumn({
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    created_at: Date;

    @CreateDateColumn({
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)', // only works with MySQL :)
    })
    updated_at: Date;

    @CreateDateColumn({
        type: 'timestamp with time zone',
        default: null,
    })
    approved_at: Date;

    // trigger (listener)

    @BeforeUpdate()
    updateTimestamp() {
        this.updated_at = new Date();
    }
}
