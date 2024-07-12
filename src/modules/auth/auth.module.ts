import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AccessControlService } from './access-control.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    providers: [AuthService, JwtStrategy, AccessControlService],
    exports: [AccessControlService],
    controllers: [AuthController],
    imports: [
        JwtModule.registerAsync({
            // register: a static function to configure the module
            // if not config here, then have to config when the module is called
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
            }),
            inject: [ConfigService],
        }),
        UsersModule,
        // ConfigModule,
    ],
})
export class AuthModule {}
