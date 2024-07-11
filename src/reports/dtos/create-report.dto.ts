import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReportDto {
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    brand: string;

    @IsString()
    @IsNotEmpty()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(2050)
    year: number;

    @IsNumber()
    @Min(0)
    kilometers: number;

    @IsLatitude()
    // @IsNotEmpty()
    lat: number;

    @IsLongitude()
    // @IsNotEmpty()
    lng: number;
}
