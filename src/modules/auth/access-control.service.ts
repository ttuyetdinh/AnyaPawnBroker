import { Role } from '../../enums/role.enum';
import { AuthorizedParams } from './interfaces/authorized-params.interface';

/**
 * Service for access control.
 */
/**
 * AccessControlService provides authorization functionality based on role hierarchy.
 */
export class AccessControlService {
    private hierachies: Array<Map<string, number>> = []; // Map in Js is similar to Dictionary in C#
    private priority: number = 1; // 1 is the highest priority

    constructor() {
        this.buildRoles([Role.ADMIN, Role.APPROVER, Role.USER]);
    }

    /**
     * Checks if the current user role is authorized to perform the specified action.
     * @param {AuthorizedParams} params - The parameters for authorization.
     * @returns {boolean | Promise<boolean>} - Returns `true` if the current user role is authorized, otherwise `false`.
     */
    isAuthorized({ currentRole, requiredRole }: AuthorizedParams): boolean | Promise<boolean> {
        for (const hierarchy of this.hierachies) {
            const userRolePriority = hierarchy.get(currentRole?.toUpperCase()); // get the priority of the current user role
            const requiredRolePriority = hierarchy.get(requiredRole); // get the priority of the required role to perform the action

            if (
                userRolePriority &&
                requiredRolePriority &&
                userRolePriority <= requiredRolePriority // lower number means higher priority
            ) {
                return true;
            }
        }

        return false;
    }

    private buildRoles(roles: Role[]) {
        const hierarchy = new Map<string, number>();
        roles.forEach((role) => {
            hierarchy.set(role, this.priority);
            this.priority++;
        });
        this.hierachies.push(hierarchy);
    }
}
