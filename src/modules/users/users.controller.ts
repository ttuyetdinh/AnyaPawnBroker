import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { Roles } from '../../decorators/role.decorator';
import { Role } from '../../enums/role.enum';
import { CurrentUserInterceptor } from '../../interceptors/current-user.interceptor';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
@Roles(Role.ADMIN)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
        this.usersService = usersService;
    }

    // the inside decorator will override the outside decorator
    @Roles(Role.USER)
    @Get('/me')
    async getMe(@CurrentUser() user: any) {
        return user;
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
