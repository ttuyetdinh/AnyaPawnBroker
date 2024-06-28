import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService) {
        this.usersService = usersService;
    }

    @Get('/user')
    @UseInterceptors(ClassSerializerInterceptor) // used to serialize the response (to Json) also exclude or include properties
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

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto) {
        return await this.usersService.create(body.email, body.password);
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
