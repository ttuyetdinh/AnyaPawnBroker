import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public-access.decorator';

@Injectable()
// create a guard that extends AuthGuard and uses the jwt strategy
// default: jwt validation is enabled for all routes, to disable it, use the @Public() decorator
// flow: the request meets the guard before it reaches the strategy
export class JwtGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    // override canActivate method to check if the route is public
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // return true if the public decorator is used
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true;

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
