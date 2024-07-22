import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { Public } from '../../decorators/public-access.decorator';
import { JwtRefreshGuard } from '../../guard/jwt-refresh.guard';
import { CurrentUserInterceptor } from '../../interceptors/current-user.interceptor';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UserDto } from '../users/dtos/user.dto';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dtos/auth-user.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';

@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
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
    @UseGuards(JwtRefreshGuard)
    @Post('refresh-accesstoken')
    async refreshAccessToken(@CurrentUser() user: any) {
        return this.authService.refreshAccessToken(user);
    }

    @Public()
    @Post('change-password')
    async changePassword(@Body() changePass: ChangePasswordDto) {
        return this.authService.changePassword(changePass);
    }
}
