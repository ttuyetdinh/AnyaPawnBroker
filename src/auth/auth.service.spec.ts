import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dtos/auth-user.dto';
import { AuthPayload } from './interfaces/auth-payload.interface';

describe('AuthService', () => {
    let service: AuthService;
    let testUserService: Partial<UsersService>;
    let testJwtService: Partial<JwtService>;
    const testUser = (): User => ({
        id: '1',
        email: 'a@gmail.com',
        password: '1234',
        username: 'ppp',
    });

    beforeEach(async () => {
        let users: User[] = [];
        // all cost in the beforeEach block will be reset before each test so don't need to reset the mock
        testUserService = {
            isUserExist: jest.fn().mockImplementation((email: string) => {
                const user = users.find((u) => u.email === email);
                return Promise.resolve(!!user);
            }),
            create: jest.fn().mockImplementation((newUser: CreateUserDto) => {
                users.push(newUser as User);
                return {
                    email: newUser.email,
                    username: newUser.username,
                    password: newUser.password,
                } as User;
            }),
            findByEmail: jest.fn().mockImplementation((email: string) => {
                const user = users.find((u) => u.email === email);
                return Promise.resolve(user);
            }),
        };

        testJwtService = {
            sign: jest.fn().mockImplementation((payload: AuthPayload) => {
                return 'token';
            }),
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: JwtService,
                    useValue: testJwtService,
                },
                {
                    provide: UsersService,
                    useValue: testUserService,
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        jest.spyOn(testUserService, 'create');
        jest.spyOn(testUserService, 'isUserExist');
        jest.spyOn(testUserService, 'findByEmail');
    });

    it('can create an instance of authService', async () => {
        expect(service).toBeDefined();
    });

    it('can sign up a user', async () => {
        // Arrange
        const newUser = testUser();

        // Act
        const createdUser = await service.signUp(newUser);
        const [hash, salt] = createdUser.password.split('.');

        // Assert
        expect(testUserService.create).toHaveBeenCalled();
        expect(createdUser.password).not.toEqual(newUser.password);
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throws an error if user already exists', async () => {
        const newUser = testUser();
        (testUserService.isUserExist as jest.Mock).mockResolvedValueOnce(true);

        await expect(service.signUp(newUser)).rejects.toThrow('User already exists');
    });

    it('throws if login with unused email', async () => {
        const user: AuthUserDto = {
            email: 'b@gmail.com',
            password: '1234',
        };

        expect(service.login(user)).rejects.toThrow('User not found');
    });

    it('throws if login with invalid password', async () => {
        const user: AuthUserDto = {
            email: 'a@gmail.com',
            password: '1234',
        };
        testUserService.findByEmail = jest.fn().mockResolvedValue({
            id: '1',
            email: 'a@gmail.com',
            password: 'hashedPassword.salt',
        });

        expect(service.login(user)).rejects.toThrow('Invalid password');
        expect(testUserService.findByEmail).toHaveBeenCalled();
    });

    it('return user with token if login is successful', async () => {
        // Arrange
        const newUser = testUser();
        const authUser: AuthUserDto = {
            email: 'a@gmail.com',
            password: '1234',
        };

        // Act
        await service.signUp(newUser);
        const result = await service.login(authUser);

        // Assert
        expect(testUserService.findByEmail).toHaveBeenCalled();
        expect(result.token).toBeDefined();
        expect(result.email).toEqual(newUser.email);
        expect(result.username).toEqual(newUser.username);
    });
});
