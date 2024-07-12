import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { testUser } from './auth.service.spec';
import { AuthUserDto } from './dtos/auth-user.dto';

describe('AuthController', () => {
    let controller: AuthController;
    let fakeUserService: Partial<UsersService>;
    let fakeAuthService: Partial<AuthService>;

    beforeEach(async () => {
        fakeUserService = {
            isUserExist: jest.fn().mockImplementation((email: string) => {
                return Promise.resolve(false);
            }),
            create: jest.fn().mockImplementation((newUser: CreateUserDto) => {}),
            findByEmail: jest.fn().mockImplementation((email: string) => {}),
        };
        fakeAuthService = {
            signUp: jest.fn().mockImplementation((newUser: CreateUserDto) => {
                var user = new User();
                user.id = '1';
                user.email = newUser.email;
                user.username = newUser.username;
                user.password = newUser.password;
                return user;
            }),
            login: jest.fn().mockImplementation((authUser: AuthUserDto) => {
                return {
                    id: '1',
                    email: authUser.email,
                    username: authUser.email.split('@')[0],
                    password: authUser.password,
                    token: 'token should be defined',
                };
            }),
        };
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: UsersService,
                    useValue: fakeUserService,
                },
                {
                    provide: AuthService,
                    useValue: fakeAuthService,
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('Controller should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should sign up a user and return defined fields', async () => {
        const newUser = testUser();

        const user = await controller.signUp(newUser);

        // validate calls
        expect(fakeAuthService.signUp).toHaveBeenCalledWith(newUser);
        expect(user instanceof User).toBe(true);

        // validate values
        expect(user.email).toEqual(newUser.email);
        expect(user.username).toBeDefined();
        expect(user.password).toBeDefined();
    });

    it('should log in a user and return defined fields', async () => {
        const toLoginUser = testUser();

        const user = await controller.login(toLoginUser);

        // validate calls
        expect(fakeAuthService.login).toHaveBeenCalledWith(toLoginUser);
        expect(user.id).toBeDefined();
        expect(user.email).toEqual(toLoginUser.email);
        expect(user.username).toBeDefined();
        expect(user.password).toBeDefined();
        expect(user.token).toBeDefined();
    });
});
