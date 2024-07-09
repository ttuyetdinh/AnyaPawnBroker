// the .env.test has to be loaded first, which before the default .evn file in the AppModule
require('dotenv').config({ path: '.env.test' });

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ValidationPipeConfig } from '../src/config/validationpipe.config';
import { AppModule } from './../src/app.module';
describe('App Test (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
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

    // afterEach(async () => {
    //     await app.close();
    // });
});
