import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AccessControlService } from './access-control.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    providers: [AuthService, JwtStrategy, JwtRefreshStrategy, AccessControlService],
    exports: [AccessControlService],
    controllers: [AuthController],
    imports: [
        JwtModule,
        UsersModule,
        // ConfigModule,
    ],
})
export class AuthModule {}
