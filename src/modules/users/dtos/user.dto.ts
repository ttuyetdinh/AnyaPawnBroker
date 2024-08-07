import { Expose } from 'class-transformer';

export class UserDto {
    @Expose()
    id: number;

    @Expose()
    email: string;

    @Expose()
    username: string;

    @Expose()
    role: string;

    @Expose()
    token: string;
}
