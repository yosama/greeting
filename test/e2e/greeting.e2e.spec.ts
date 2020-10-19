import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';

import { MainModule } from '../../src/main.module';
import { GreetingService } from '../../src/greeting/greeting.service';
import { countriesList } from '../mock/jsonbin.mock';

describe('GreetingController (e2e)', () => {
    let app: INestApplication;
    let greetingService: GreetingService;

    beforeAll(async () => {
        process.env = Object.assign(process.env, { LOGGING_LEVEL: 'ERROR' });
        process.env = Object.assign(process.env, { AUTH_ENABLED: false });

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                MainModule
            ]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        greetingService = app.get<GreetingService>(GreetingService);
    });

    describe ('/countries', () => {

        it('/countries (GET) 200', () => {
            const greetingServiceSpy = jest.spyOn(greetingService, 'getCountryData')
                .mockImplementation(() => {
                    return Promise.resolve(countriesList);
                });
            const ONE_TIME = 1;

            return request(app.getHttpServer())
            .get('/countries')
            .expect(HttpStatus.OK)
            .then(res => {
                expect(greetingServiceSpy).toHaveBeenCalledTimes(ONE_TIME);
                expect(res.body).toBeDefined();
                greetingServiceSpy.mockRestore();
            });
        });

        it('/countries (GET) 400', () => {
            const CERO_TIME = 0;
            const greetingServiceSpy = jest.spyOn(greetingService, 'getCountryData')
                .mockImplementation(() => {
                    return Promise.resolve(countriesList);
                });

            return request(app.getHttpServer())
                .get('/countries')
                .query({ filtro: 'aa', orden:'desc' })
                .expect(HttpStatus.BAD_REQUEST)
                .then(res => {
                    expect(greetingServiceSpy).toHaveBeenCalledTimes(CERO_TIME);
                    expect(res.body).toBeDefined();
                    expect(res.body.status).toEqual(HttpStatus.BAD_REQUEST);
                    greetingServiceSpy.mockRestore();
                });
        });

        it('/countries (GET) 400', () => {
            const CERO_TIME = 0;
            const greetingServiceSpy = jest.spyOn(greetingService, 'getCountryData')
                .mockImplementation(() => {
                    return Promise.resolve(countriesList);
                });

            return request(app.getHttpServer())
                .get('/countries')
                .query({ orden: 'invalid_order' })
                .expect(HttpStatus.BAD_REQUEST)
                .then(res => {
                    expect(greetingServiceSpy).toHaveBeenCalledTimes(CERO_TIME);
                    expect(res.body).toBeDefined();
                    expect(res.body.status).toEqual(HttpStatus.BAD_REQUEST);
                    greetingServiceSpy.mockRestore();
                });
        });
    });

    describe ('/reverse', () => {

        it('/reverse (GET) 200', () => {

            const param = 'hallo';
            const greetingServiceSpy = jest.spyOn(greetingService, 'reverse');
            const ONE_TIME = 1;

            return request(app.getHttpServer())
            .get(`/reverse/${param}`)
            .expect(HttpStatus.OK)
            .then(res => {
                expect(greetingServiceSpy).toHaveBeenCalledTimes(ONE_TIME);
                expect(res.body).toBeDefined();
                greetingServiceSpy.mockRestore();
            });
        });
    });
});
