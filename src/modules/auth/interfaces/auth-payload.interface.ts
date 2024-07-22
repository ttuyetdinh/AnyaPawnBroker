import { Role } from '../../../enums/role.enum';

export interface AuthPayload {
    id: string;
    email: string;
    iat: number;
    role?: Role; //role is optional property
}
