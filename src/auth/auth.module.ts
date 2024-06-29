import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    imports: [
        JwtModule.register({
            // if not config here, then have to config when the module is called
            secret: '12345',
            signOptions: { expiresIn: '60m' },
        }),
        UsersModule,
    ],
})
export class AuthModule {}
