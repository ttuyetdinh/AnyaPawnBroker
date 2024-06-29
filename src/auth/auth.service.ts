import { Injectable } from '@nestjs/common';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthUserDto } from './dtos/auth-user.dto';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signUp(newUser: CreateUserDto) {
        const isUserExist = await this.usersService.isUserExist(newUser.email);
        if (isUserExist) {
            throw new Error('User already exists');
        }

        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(newUser.password, salt, 32)) as Buffer;

        newUser.username = newUser.username || newUser.email.split('@')[0];
        newUser.password = `${hash.toString('hex')}.${salt}`;

        const createdUser = await this.usersService.create(newUser);

        return createdUser;
    }

    async login(authUser: AuthUserDto) {
        const user = await this.usersService.findByEmail(authUser.email);
        if (!user) {
            throw new Error('User not found');
        }

        const [hash, salt] = user.password.split('.');
        const hashBuffer = (await scrypt(
            authUser.password,
            salt,
            32,
        )) as Buffer;

        if (hashBuffer.toString('hex') !== hash) {
            throw new Error('Invalid password');
        }

        return user;
    }
}
