import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
// create a guard that extends AuthGuard and uses the jwt strategy
// default: jwt validation is enabled for all routes, to disable it, use the @Public() decorator
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
    constructor(private reflector: Reflector) {
        super();
    }

    // override canActivate method to check if the route is public
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }

    // user is retrieved from the validate method in the strategy
    handleRequest<TUser = any>(
        err: any,
        user: any,
        info: any,
        context: ExecutionContext,
        status?: any,
    ): TUser {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }

        return user;
    }
}
