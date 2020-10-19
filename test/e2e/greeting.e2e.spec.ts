import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import nock from 'nock';

import { MainModule } from '../../src/main.module';
import { GreetingService } from '../../src/greeting/greeting.service';
import { countriesList } from '../mock/jsonbin.mock';
import { envs } from '../service/greeting.service.spec';

describe('GreetingController (e2e)', () => {
    let app: INestApplication;
    let greetingService: GreetingService;

    const ONE_TIME = 1;

    beforeAll(async () => {
        process.env = Object.assign(process.env, envs);

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                MainModule
            ]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        greetingService = app.get<GreetingService>(GreetingService);
    });

    afterAll(() => {
        nock.cleanAll();
    });

    describe ('/countries', () => {

        it('/countries (GET) 200', () => {
            const greetingServiceSpy = jest.spyOn(greetingService, 'getCountryData')
                .mockImplementation(() => {
                    return Promise.resolve(countriesList);
                });

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
            const greetingServiceSpy = jest.spyOn(greetingService, 'getCountryData')
                .mockImplementation(() => {
                    return Promise.resolve(countriesList);
                });

            return request(app.getHttpServer())
                .get('/countries')
                .query({ filtro: 'aa', orden:'desc' })
                .expect(HttpStatus.BAD_REQUEST)
                .then(res => {
                    expect(greetingServiceSpy).not.toHaveBeenCalled();
                    expect(res.body).toBeDefined();
                    expect(res.body.status).toEqual(HttpStatus.BAD_REQUEST);
                    greetingServiceSpy.mockRestore();
                });
        });

        it('/countries (GET) 400', () => {
            const greetingServiceSpy = jest.spyOn(greetingService, 'getCountryData')
                .mockImplementation(() => {
                    return Promise.resolve(countriesList);
                });

            return request(app.getHttpServer())
                .get('/countries')
                .query({ orden: 'invalid_order' })
                .expect(HttpStatus.BAD_REQUEST)
                .then(res => {
                    expect(greetingServiceSpy).not.toHaveBeenCalled();
                    expect(res.body).toBeDefined();
                    expect(res.body.status).toEqual(HttpStatus.BAD_REQUEST);
                    greetingServiceSpy.mockRestore();
                });
        });

        it('/countries (GET) 500', () => {
            const msgError = 'Jsonbin API not available';

            nock('https://api.jsonbin.io')
                .get('/b/5f69afbe65b18913fc510ce8')
                .replyWithError(msgError);

            const greetingServiceSpy = jest.spyOn(greetingService, 'getCountryData');

            return request(app.getHttpServer())
                .get('/countries')
                .expect(HttpStatus.INTERNAL_SERVER_ERROR)
                .then(res => {
                    expect(greetingServiceSpy).toHaveBeenCalledTimes(ONE_TIME);
                    expect(res.body).toBeDefined();
                    expect(res.body.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
                    expect(res.body.message).toEqual(msgError);
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

    describe ('/append', () => {

        it('/append (PUT) 200', () => {
            const greetingServiceSpy = jest.spyOn(greetingService, 'updateGreetingList');
            const ONE_TIME = 1;

            return request(app.getHttpServer())
            .put('/append')
            .query({ start: 'hola', end: 'bye' })
            .expect(HttpStatus.OK)
            .then(res => {
                expect(greetingServiceSpy).toHaveBeenCalledTimes(ONE_TIME);
                expect(res.body).toBeDefined();
                greetingServiceSpy.mockRestore();
            });
        });

        it('/append (PUT) 400', () => {
            const greetingServiceSpy = jest.spyOn(greetingService, 'updateGreetingList');

            return request(app.getHttpServer())
            .put('/append')
            .query({ invalidStart: 'hola', end: 'bye' })
            .expect(HttpStatus.BAD_REQUEST)
            .then(res => {
                expect(greetingServiceSpy).not.toHaveBeenCalled();
                expect(res.body).toBeDefined();
                greetingServiceSpy.mockRestore();
            });
        });


    });
});
