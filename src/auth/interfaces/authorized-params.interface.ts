import { Role } from '../enums/role.enum';

export interface AuthorizedParams {
    currentRole: Role;
    requiredRole: Role;
}
