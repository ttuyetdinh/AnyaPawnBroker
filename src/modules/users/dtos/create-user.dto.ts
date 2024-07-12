import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    username: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    role: string;
}
