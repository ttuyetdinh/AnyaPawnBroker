import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { Role } from '../../enums/role.enum';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthUserDto } from './dtos/auth-user.dto';
import { AuthPayload } from './interfaces/auth-payload.interface';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async signUp(newUser: CreateUserDto) {
        const isUserExist = await this.usersService.isUserExist(newUser.email);
        if (isUserExist) {
            throw new Error('User already exists');
        }

        const toBeCreatedUser = {
            email: newUser.email,
            username: newUser.username || newUser.email.split('@')[0],
            password: await this.hashPassword(newUser.password),
            role: newUser.role,
        };

        const createdUser = await this.usersService.create(toBeCreatedUser);

        return createdUser;
    }

    async login(authUser: AuthUserDto) {
        const user = await this.usersService.findByEmail(authUser.email);
        if (!user) {
            throw new Error('User not found');
        }

        const isValidPassword = await this.verifyPassword(authUser.password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }

        const payload: AuthPayload = {
            id: user.id,
            email: user.email,
            role: user.role as Role,
        };

        const accessToken = await this.createAccessToken(payload);
        const refreshToken = await this.createRefreshToken(payload);

        return { ...user, accessToken, refreshToken };
    }

    async refreshAccessToken(user: any) {
        const payload: AuthPayload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        const accessToken = await this.createAccessToken(payload);

        return { accessToken };
    }

    // private methods
    private async hashPassword(password: string, salt: string = ''): Promise<string> {
        salt = salt || randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        return `${hash.toString('hex')}.${salt}`;
    }

    private async verifyPassword(password: string, storedPassword: string): Promise<boolean> {
        const [hashedPassword, salt] = storedPassword.split('.');
        const hashBuffer = (await scrypt(password, salt, 32)) as Buffer;

        return hashBuffer.toString('hex') === hashedPassword;
    }

    private async createAccessToken(payload: AuthPayload) {
        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
        });
    }

    private async createRefreshToken(payload: AuthPayload) {
        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
        });
    }
}
