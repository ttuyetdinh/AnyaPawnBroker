import { Expose, Transform } from 'class-transformer';

export class ReportDto {
    @Expose()
    id: string;

    @Transform(({ obj }) => obj?.user?.id || null)
    @Expose()
    userId: string;

    @Transform(({ obj }) => obj?.approvedBy?.id || null)
    @Expose()
    approvedById: string;

    @Expose()
    price: number;

    @Expose()
    brand: string;

    @Expose()
    model: string;

    @Expose()
    year: number;

    @Expose()
    kilometers: number;

    @Expose()
    lat: number;

    @Expose()
    lng: number;

    @Expose()
    isApproved: boolean;

    @Expose()
    approved_at: Date;

    @Expose()
    created_at: Date;

    @Expose()
    updated_at: Date;
}
