import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { AuthPayload } from '../interfaces/auth-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private configService: ConfigService, private userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_ACCESS_SECRET'),
        });
    }

    // user is validated before it goes to the validate method
    async validate(payload: AuthPayload) {
        // check if user exists
        const user = await this.userService.findById(payload.id);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        // check if user recent change password
        if (user.passwordChangedAt) {
            const changedTimestamp = parseInt(
                (user.passwordChangedAt.getTime() / 1000).toString(),
                10,
            );
            if (payload.iat < changedTimestamp) {
                throw new UnauthorizedException('Password recently changed. Please login again');
            }
        }

        // return value of this method will be injected into the request object as req.user
        return payload;
    }
}
