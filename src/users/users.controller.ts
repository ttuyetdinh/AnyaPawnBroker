import { Body, Controller, Delete, Get, Param, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
        this.usersService = usersService;
    }

    @UseGuards(JwtGuard)
    @Get('/me')
    async getMe(@Req() req: any) {
        return req.user;
    }

    @Get('/user')
    async getUserByEmail(@Query() query: any) {
        if (query.email) {
            return this.usersService.findByEmail(query.email);
        }

        return this.usersService.findAll();
    }
    @Get('/:id')
    async getUserById(@Param('id') id: string) {
        return this.usersService.findById(id);
    }
    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(id, body);
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string) {
        await this.usersService.remove(id);
    }
}
