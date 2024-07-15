import { Transform } from 'class-transformer';
import { IsLatitude, IsLongitude, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryParamsReportDto {
    @IsOptional()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    brand: string;

    @IsOptional()
    @IsString()
    model: string;

    @IsOptional()
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    year: number;

    @IsOptional()
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    kilometers: number;

    @IsOptional()
    @IsLatitude()
    @Transform(({ value }) => parseInt(value))
    lat: number;

    @IsOptional()
    @IsLongitude()
    @Transform(({ value }) => parseInt(value))
    lng: number;
}
