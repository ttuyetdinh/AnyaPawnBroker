import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentUserInterceptor } from '../../interceptors/current-user.interceptor';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService, CurrentUserInterceptor],
    exports: [UsersService],
    imports: [TypeOrmModule.forFeature([User])], // 👈 Import the User entity
})
export class UsersModule {}
