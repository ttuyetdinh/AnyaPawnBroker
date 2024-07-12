import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../guard/jwt.guard';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UserDto } from '../users/dtos/user.dto';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dtos/auth-user.dto';

@Serialize(UserDto)
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    async signUp(@Body() newUser: CreateUserDto) {
        return this.authService.signUp(newUser);
    }

    @Post('login')
    async login(@Body() authUser: AuthUserDto) {
        return this.authService.login(authUser);
    }

    // @Post('logout')
    // async logout() {
    //     return this.authService.logout();
    // }

    @UseGuards(JwtGuard)
    @Post('change-password')
    async changePassword(@Req() req: any) {
        return 'Password changed successfully';
    }
}
