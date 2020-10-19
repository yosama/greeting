import { Test, TestingModule } from '@nestjs/testing';
import nock from 'nock';

import { JsonbinService } from '../../src/greeting/jsonbin.service';
import { countriesList } from '../mock/jsonbin.mock';
import { MainModule } from '../../src/main.module';

export const envs = {
    LOGGING_LEVEL: 'ERROR',
    SIMPLE_ARRAY: 'hallo,hola,ciao,bonjour,oi',
    NODE_ENV: 'development'
};

describe('JsonbinService', () => {
    let jsonbinService: JsonbinService;

    beforeAll(async () => {

        process.env = Object.assign(process.env, envs);

        const app: TestingModule = await Test.createTestingModule({
            imports: [MainModule]
        }).compile();

        jsonbinService = app.get<JsonbinService>(JsonbinService);
    });

    afterAll(() => {
        nock.cleanAll();
    });

    describe('getCountries', () => {

        it('getCountries() should return a Promise', (done) => {

            const res = jsonbinService.getCountries();

            expect(res).toHaveProperty('then');
            expect(res).toHaveProperty('catch');
            done();
        });

        it('should return countries data list from api successful', (done) => {

            nock('https://api.jsonbin.io')
                .get('/b/5f69afbe65b18913fc510ce8')
                .reply(200, countriesList);

            const res = jsonbinService.getCountries();

            const FIRST_ELEMENT = 0;
            res.then(x => {
                expect(x).toBeDefined();
                expect(x).toBeInstanceOf(Array);
                expect(x.length).toBeGreaterThan(FIRST_ELEMENT);
                done();
            });
        });

        it('should catch error when jsonbin API failed', (done) => {

            nock('https://api.jsonbin.io')
                .get('/b/5f69afbe65b18913fc510ce8')
                .replyWithError('Jsonbin API not available');

            const res = jsonbinService.getCountries();

            res.catch(ex => {
                expect(ex).toBeDefined();
                expect(ex).toBeInstanceOf(Error);
                done();
            });
        });
    });
});