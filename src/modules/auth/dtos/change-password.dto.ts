import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    oldPassword: string;

    @IsString()
    @IsNotEmpty()
    newPassword: string;
}
