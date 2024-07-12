import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { AccessControlService } from '../modules/auth/access-control.service';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector, private accessControlService: AccessControlService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        const request = context.switchToHttp().getRequest();
        const user = request.user; // this is the valid jwt token decoded by JwtStrategy

        for (const role of requiredRoles) {
            const isGranted = this.accessControlService.isAuthorized({
                currentRole: user.role,
                requiredRole: role,
            });

            if (isGranted) {
                return true;
            }
        }

        return false;
    }
}
