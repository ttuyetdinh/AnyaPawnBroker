import { Body, Controller, Post, Req } from '@nestjs/common';
import { Public } from '../../decorators/public-access.decorator';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UserDto } from '../users/dtos/user.dto';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dtos/auth-user.dto';

@Serialize(UserDto)
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public() // decorator for jwt guard
    @Post('signup')
    async signUp(@Body() newUser: CreateUserDto) {
        return this.authService.signUp(newUser);
    }

    @Public()
    @Post('login')
    async login(@Body() authUser: AuthUserDto) {
        return this.authService.login(authUser);
    }

    @Public()
    @Post('change-password')
    async changePassword(@Req() req: any) {
        return 'Password changed successfully';
    }
}
