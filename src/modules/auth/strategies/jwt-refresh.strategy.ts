import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { AuthPayload } from '../interfaces/auth-payload.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(private configService: ConfigService, private userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_REFRESH_SECRET'),
        });
    }

    async validate(payload: AuthPayload) {
        const user = await this.userService.findById(payload.id);

        if (!user) {
            throw new BadRequestException('User not found');
        }

        // return value of this method will be injected into the request object as req.user
        return payload;
    }
}
