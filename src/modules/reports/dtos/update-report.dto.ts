import { IsLatitude, IsLongitude, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateReportDto {
    @IsNumber()
    @IsOptional()
    price: number;

    @IsString()
    @IsOptional()
    brand: string;

    @IsString()
    @IsOptional()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(2050)
    @IsOptional()
    year: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    kilometers: number;

    @IsLatitude()
    @IsOptional()
    lat: number;

    @IsLongitude()
    @IsOptional()
    lng: number;
}
