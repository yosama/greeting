import { Test, TestingModule } from '@nestjs/testing';

import { GreetingService } from '../../src/greeting/greeting.service';
import { JsonbinService } from '../../src/greeting/jsonbin.service';
import { JsonbinServiceMock, validJsonbinData } from '../mock/jsonbin.mock';
import {
    CountryDataDTO,
} from '../../src/greeting/dto/greeting.dto';
import { MainModule } from '../../src/main.module';

describe('GreetingService', () => {
    let greetingService: GreetingService;

    beforeAll(async () => {
        process.env = Object.assign(process.env, { LOGGING_LEVEL: 'ERROR' });

        const app: TestingModule = await Test.createTestingModule({
            imports: [MainModule]
        })
            .overrideProvider(JsonbinService)
            .useClass(JsonbinServiceMock)
            .compile();

        greetingService = app.get<GreetingService>(GreetingService);
    });

    describe('getCountryData', () => {
        const FROM = 0, LENGTH = 2;
        const queryParams = {
            filter: validJsonbinData.country.substr(FROM, LENGTH),
            order:'asc'
        };

        it('getCountryData() should return a Promise', (done) => {

            const res = greetingService.getCountryData(queryParams);

            expect(res).toHaveProperty('then');
            expect(res).toHaveProperty('catch');
            done();

        });

        it('should return countries data with filter and sorts ascending', (done) => {

            const res: Promise<CountryDataDTO[]> =
                greetingService.getCountryData(queryParams);

            const FIRST_ELEMENT = 0;
            const SECOND_ELEMENT = 1;
            res.then(x => {
                expect(x).toBeDefined();
                expect(x).toBeInstanceOf(Array);
                expect(x.length).toBeGreaterThan(FIRST_ELEMENT);
                if (x.length > SECOND_ELEMENT) {
                    expect(x[FIRST_ELEMENT].vat).toBeLessThanOrEqual(x[SECOND_ELEMENT].vat);
                }
                done();
            });
        });

        it('should return countries data with filter and sorts descending', (done) => {

            queryParams.order ='desc';
            const res: Promise<CountryDataDTO[]> =
                greetingService.getCountryData(queryParams);

            const FIRST_ELEMENT = 0;
            const SECOND_ELEMENT = 1;
            res.then(x => {
                expect(x).toBeDefined();
                expect(x).toBeInstanceOf(Array);
                expect(x.length).toBeGreaterThan(FIRST_ELEMENT);
                if (x.length > SECOND_ELEMENT) {
                    expect(x[SECOND_ELEMENT].vat).toBeLessThanOrEqual(x[FIRST_ELEMENT].vat);
                }
                done();
            });
        });

        it('should return countries data sorts ascending when filter undefined', (done) => {

            queryParams.filter = undefined;
            const res: Promise<CountryDataDTO[]> =
                greetingService.getCountryData(queryParams);

            const FIRST_ELEMENT = 0;
            const SECOND_ELEMENT = 1;
            res.then(x => {
                expect(x).toBeDefined();
                expect(x).toBeInstanceOf(Array);
                expect(x.length).toBeGreaterThan(FIRST_ELEMENT);
                if (x.length > SECOND_ELEMENT) {
                    expect(x[FIRST_ELEMENT].vat).toBeGreaterThanOrEqual(x[SECOND_ELEMENT].vat);
                }
                done();
            });
        });

        it('should not return countries when filter not match', (done) => {

            queryParams.filter = 'filter_not_found';
            const res: Promise<CountryDataDTO[]> =
                greetingService.getCountryData(queryParams);

            const FIRST_ELEMENT = 0;

            res.then(x => {
                expect(x).toBeDefined();
                expect(x).toBeInstanceOf(Array);
                expect(x.length).toEqual(FIRST_ELEMENT);
                done();
            });
        });

        it('should return countries when filter not match', (done) => {

            queryParams.filter = 'filter_not_found';
            const res: Promise<CountryDataDTO[]> =
                greetingService.getCountryData(queryParams);

            const FIRST_ELEMENT = 0;

            res.then(x => {
                expect(x).toBeDefined();
                expect(x).toBeInstanceOf(Array);
                expect(x.length).toEqual(FIRST_ELEMENT);
                done();
            });
        });
    });

});
