import { IsNotEmpty, IsString } from 'class-validator';
export class CreateMeassageDto {
    @IsString()
    @IsNotEmpty()
    content: string | undefined;
}
