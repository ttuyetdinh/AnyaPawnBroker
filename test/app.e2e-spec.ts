// the .env.test has to be loaded first, which before the default .evn file in the AppModule
require('dotenv').config({ path: '.env.test' });

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { EntityManager } from 'typeorm';
import { ValidationPipeConfig } from '../src/config/validationpipe.config';
import { AppModule } from './../src/app.module';
describe('App Test (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipeConfig());

        await app.init();
    });

    it('/ (GET) Default test', async () => {
        return request.default(app.getHttpServer()).get('/app').expect(200).expect('Hello World!');
    });

    it('handles signup request', async () => {
        const email = 'b@gmail.com';
        return request
            .default(app.getHttpServer())
            .post('/auth/signup')
            .send({
                email: email,
                password: '1234',
            })
            .expect(201)
            .then((res) => {
                expect(res.body.id).toBeDefined();
                expect(res.body.email).toEqual(email);
            });
    });

    it('sign up success then login in a user success', async () => {
        const newUser = { email: 'a@gmail.com', password: '1234' };
        const res = await request.default(app.getHttpServer()).post('/auth/signup').send(newUser);

        const res2 = await request.default(app.getHttpServer()).post('/auth/login').send(newUser);

        expect(res2.body.id).toBeDefined();
        expect(res2.body.email).toEqual(newUser.email);
        expect(res2.body.username).toBeDefined();
        expect(res2.body.password).toBeUndefined();
        expect(res2.body.token).toBeDefined();
    });

    afterEach(async () => {
        await clearDatabase(app);
    });

    afterAll(async () => {
        await app.close();
    });
});

// helper method
async function clearDatabase(app: INestApplication): Promise<void> {
    try {
        const entityManager = app.get<EntityManager>(EntityManager);

        await entityManager.transaction(async (transEntityManager) => {
            const tableNames = transEntityManager.connection.entityMetadatas
                .map((entity) => entity.tableName)
                .join(', ');

            await transEntityManager.query(`TRUNCATE "${tableNames}" RESTART IDENTITY CASCADE;`);
        });
    } catch (error) {
        throw new Error(`ERROR: Cleaning test db: ${error}`);
    }
}
