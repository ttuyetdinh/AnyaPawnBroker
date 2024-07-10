import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

    @CreateDateColumn({
        type: 'timestamp without time zone',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    created_at: Date;

    @CreateDateColumn({
        type: 'timestamp without time zone',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)', // only works with MySQL :)
    })
    updated_at: Date;
}
